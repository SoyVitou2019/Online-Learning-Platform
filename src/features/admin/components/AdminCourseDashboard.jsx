import { useState, useEffect, Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/api/Auth";

import END_POINTS from "@/src/constants/endpoints";
import axios from "axios";
import { Spinner } from "@/src/components/Spinner";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";

const AdminCourseDashboard = ({ searchValue }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [courses, setCourses] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState({});

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

      console.log(newCoursesData);
      setCourses(newCoursesData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            {filteredCourses &&
              filteredCourses.map((course, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">
                    <p className=" text-ellipsis line-clamp-1">{course.id}</p>
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
export default AdminCourseDashboard;
