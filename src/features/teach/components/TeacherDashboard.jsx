import { useState, useEffect, Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/api/Auth";
import END_POINTS from "@/src/constants/endpoints";
import axios from "axios";
import { Spinner } from "@/src/components/Spinner";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import CategoryFilter from "../../search/components/CategoryFilter";
import SortBy from "../../search/components/SortBy";

const TeacherDashboard = () => {
  const [userID, setUserID] = useState(0);
  const navigate = useNavigate();

  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const [courses, setCourses] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayCourses, setDisplayCourses] = useState([]);

  const [selectedSortBy, setSelectedSortBy] = useState("");
  const sortByList = ["Latest", "Oldest"];

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${END_POINTS.COURSE}?_sort=created_at&created_by_user_id=${userID}`
      );
      const coursesData = response.data;

      console.log(coursesData);
      sortAndFilter(coursesData);
      setCourses(coursesData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(END_POINTS.CATEGORY);
        setAllCategories(response.data.map((cat) => cat.title)); // Assuming the endpoint returns an array of category names
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  console.log(allCategories);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(END_POINTS.USER + "?uid=" + user.id);
        const userData = response.data;
        setUserID(userData[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user.id !== null) {
      fetchUser().then(fetchCourses());
    }
  }, [userID]);

  // delete modal
  const openDeleteModal = (course) => {
    setDeleteModalOpen(true);
    setDeletingCourse(course);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setDeleteModalOpen(false);
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== deletingCourse.id)
    );

    const postIDArr = deletingCourse.posts;

    await Promise.all(
      postIDArr.map(async (postID) => {
        await axios.delete(END_POINTS.POST + "/" + postID);
      })
    );

    await axios.delete(END_POINTS.COURSE + "/" + deletingCourse.id);

    fetchCourses();
  };
  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortAndFilter = (coursesToFilter) => {
    console.log("filter");
    // Search filter
    let searchFilteredCourses = coursesToFilter.filter((course) =>
      course.course_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    console.log(courses);
    // Categorized filter, possible values of selectedcategory ["", "Math", "Physics"]
    if (selectedCategory !== "") {
      searchFilteredCourses = searchFilteredCourses.filter(
        (course) => course.category === selectedCategory
      );
    }

    console.log(selectedSortBy);
    if (selectedSortBy !== "") {
      if (selectedSortBy === "Oldest")
        searchFilteredCourses.sort((a, b) => {
          if (a.created_at < b.created_at) {
            return -1;
          } else if (a.created_at > b.created_at) {
            return 1;
          } else {
            return 0;
          }
        });
      else if (selectedSortBy === "Latest")
        searchFilteredCourses.sort((a, b) => {
          // Assuming course.created_at is in a date format
          if (a.created_at > b.created_at) {
            return -1;
          }
          if (a.created_at < b.created_at) {
            return 1;
          }
          return 0;
        });
    }

    console.log(searchFilteredCourses);
    setDisplayCourses(searchFilteredCourses);
    // Sort by category.created by ascending vs descending
  };

  useEffect(() => {
    sortAndFilter(courses);
  }, [selectedCategory, selectedSortBy, searchValue]);

  return (
    <div className="mb-32">
      <div className="px-5 flex justify-start border-t border-b border-gray-300">
        <Link
          to="/teach/upload"
          className=" p-4 py-2 text-md font-medium text-center"
        >
          Course
        </Link>
        <Link to="/teach/dashboard" className=" p-4  py-2 text-md font-medium ">
          Dashboard
        </Link>
      </div>
      <div className="flex justify-between my-5 mb-8">
        <p className="font-bold pl-9 text-xl  my-auto">Course Dashboard</p>
        <div className="flex items-center bg-slate-200 rounded-lg z-30">
          <p className="text-lg mx-5">Category: </p>
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="flex items-center bg-slate-200 rounded-lg z-30">
          <p className="text-lg mx-5">Sort by: </p>

          <SortBy
            sortBy={selectedSortBy}
            sortByList={sortByList}
            onSortBy={setSelectedSortBy}
          />
        </div>
        <div className=" w-96 my-auto mr-8">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-2xl p-2 ps-10 text-sm text-gray-900 border border-gray-300"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center h-[80vh] flex-col items-center">
          <Spinner size="lg" />
        </div>
      )}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Course Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Created At
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {displayCourses &&
              displayCourses.map((course, index) => (
                <tr key={index + 1}>
                  <td className="py-2 px-4 border-b text-center">
                    <p className=" text-ellipsis line-clamp-1">{index + 1}</p>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <p className=" text-ellipsis line-clamp-1">
                      {course.course_name}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <p className=" text-ellipsis line-clamp-1 ">
                      {course.category}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <p className=" text-ellipsis line-clamp-1 ">
                      {course.created_at.slice(0, 10)}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => {
                        navigate("/teach/course/" + course.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => openDeleteModal(course)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Transition appear show={deleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Do you want to delete {deletingCourse.course_name}?
                  </Dialog.Title>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default TeacherDashboard;
