import { useState, useEffect, Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/api/Auth";

import END_POINTS from "@/src/constants/endpoints";
import axios from "axios";
import { Spinner } from "@/src/components/Spinner";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import CategoryFilter from "../../search/components/CategoryFilter";
import SortBy from "../../search/components/SortBy";

const AdminCourseDashboard = ({ searchValue }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await axios.get(`${END_POINTS.COURSE}?_sort=id`);
      const coursesData = response.data;

      let newCoursesData = [];
      await Promise.all(
        coursesData.map(async (course) => {
          const res = await axios.get(
            END_POINTS.USER + "/" + course.created_by_user_id
          );

          course.created_by = res.data.firstName + " " + res.data.lastName;

          newCoursesData.push(course);
        })
      );

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

  console.log(courses);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(END_POINTS.USER + "?uid=" + user.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user.id !== null) {
      fetchUser().then(() => {
        fetchCourses();
      });
    }
  }, []);

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

  return (
    <div className="mb-32 bg-white">
      {isLoading && (
        <div className="flex justify-center h-[80vh] flex-col items-center">
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && (
        <>
          {" "}
          <div className="flex justify-start py-5 pb-8 gap-8">
            <p className="font-bold pl-9 text-xl  my-auto mr-auto">
              Course Dashboard
            </p>
            <div className="flex items-center bg-slate-200 rounded-lg z-30">
              <p className="text-lg mx-5">Category: </p>
              <CategoryFilter
                categories={allCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
            <div className="flex items-center bg-slate-200 rounded-lg z-30 mr-10">
              <p className="text-lg mx-5">Sort by: </p>

              <SortBy
                sortBy={selectedSortBy}
                sortByList={sortByList}
                onSortBy={setSelectedSortBy}
              />
            </div>
          </div>
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
                    Created By
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
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        <p className=" text-ellipsis line-clamp-1">
                          {course.id}
                        </p>
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
                          {course.created_by}
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
            <Dialog
              as="div"
              className="relative z-10"
              onClose={closeDeleteModal}
            >
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
        </>
      )}
    </div>
  );
};
export default AdminCourseDashboard;
