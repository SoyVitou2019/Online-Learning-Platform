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

const TeacherDashboard = () => {
  const [userID, setUserID] = useState(0);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [courses, setCourses] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState({});

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${END_POINTS.COURSE}?_sort=created_at&created_by_user_id=${userID}&_page=${page}&_limit=${itemsPerPage}`
      );
      const coursesData = response.data;
      console.log(
        `${END_POINTS.COURSE}?_sort=created_at&created_by_user_id=${userID}&_page=${page}&_limit=${itemsPerPage}`
      );

      const linkHeader = response.headers.link;
      if (linkHeader) {
        const totalPagesRegex = /_page=(\d+)&_limit=(\d+)>; rel="last"/;
        const match = linkHeader.match(totalPagesRegex);
        if (match) {
          setTotalPages(parseInt(match[1], 10));
        }
      }
      setCourses((prevCourses) => [...prevCourses, ...coursesData]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
  }, [page, itemsPerPage, userID]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
      <p className="font-bold pl-9 pt-4 mb-7 ">Course Dashboard</p>
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
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, index) => (
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
      {courses.length > 0 && page < totalPages && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-auto block mb-14"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
};
export default TeacherDashboard;
