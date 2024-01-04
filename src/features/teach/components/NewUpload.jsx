import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

const VideoTable = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "Video 1",
      link: "https://www.example.com/video1",
    },
    {
      id: 2,
      name: "Video 2",
      link: "https://www.example.com/video2",
    },
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addingVideo, setAddingVideo] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingVideo, setDeletingVideo] = useState({});

  const handleAddEditVideo = (data) => {
    if (editingVideo) {
      // Update existing video
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === editingVideo.id ? { ...video, ...data } : video
        )
      );
    } else {
      // Add new video
      setVideos((prevVideos) => [...prevVideos, { id: Date.now(), ...data }]);
    }

    // closeModal();
  };

  //   const handleEdit = (video) => {
  //     setEditingVideo(video);
  //     // openModal();
  //   };

  //   const handleDelete = (id) => {
  //     setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  //   };

  // add modal
  const openAddModal = () => {
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAdd = () => {
    setAddModalOpen(false);
  };

  // edit modal
  const openEditModal = (video) => {
    setEditModalOpen(true);
    setEditingVideo(video);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    setEditModalOpen(false);
  };

  // delete modal
  const openDeleteModal = (video) => {
    setDeleteModalOpen(true);
    setDeletingVideo(video);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
  };

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCategory: "",
    courseDescription: "",
    courseExpectations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted with data:", courseData);
  };

  return (
    <div>
      {/* header */}
      <div className="px-5 flex justify-start border-t border-b border-gray-300">
        <a href="#" className=" p-4 py-2 text-md font-medium text-center">
          Course
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Analytics
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ml-auto ">
          Publish
        </a>
      </div>
      <p className="font-bold pl-9 pt-4 ">Upload Videos</p>

      {/* course data form */}

      <div className="flex flex-col justify-center items-stretch">
        <div className="max-w-screen-lg p-4 w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg">
            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-600"
              >
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={courseData.courseName}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter course name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="courseCategory"
                className="block text-sm font-medium text-gray-600"
              >
                Course Category
              </label>
              <input
                type="text"
                id="courseCategory"
                name="courseCategory"
                value={courseData.courseCategory}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter course category"
              />
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="courseDescription"
                className="block text-sm font-medium text-gray-600"
              >
                Course Description
              </label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={courseData.courseDescription}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter course description"
              ></textarea>
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="courseExpectations"
                className="block text-sm font-medium text-gray-600"
              >
                Course Expectations
              </label>
              <textarea
                id="courseExpectations"
                name="courseExpectations"
                value={courseData.courseExpectations}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter course expectations"
              ></textarea>
            </div>
          </div>
        </div>

        {/* video table */}
        <div className="flex justify-center gap-9"></div>
        <div className="container mx-auto mt-8 p-4">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b text-center">Video Name</th>
                <th className="py-2 px-4 border-b text-center">Video Link</th>
                <th className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded py-2"
                    onClick={openAddModal}
                  >
                    Add +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="py-2 px-4 border-b text-center">{video.id}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {video.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {video.link}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => {
                        openEditModal(video);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => openDeleteModal(video)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Transition appear show={addModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
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
                      Add new video
                    </Dialog.Title>

                    <div className="mt-5">
                      <label
                        htmlFor="link"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Enter YouTube Video Link Here
                      </label>
                      <input
                        id="link"
                        name="link"
                        value=""
                        onChange={(e) =>
                          setAddingVideo({
                            ...addingVideo,
                            link: e.target.value,
                          })
                        }
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg"
                        placeholder="YouTube link"
                      ></input>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeAddModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleAdd}
                      >
                        Add
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={editModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
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
                      Edit video
                    </Dialog.Title>

                    <div className="mt-5">
                      <label
                        htmlFor="link"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Enter YouTube Video Link Here
                      </label>
                      <input
                        id="link"
                        name="link"
                        value={editingVideo?.link}
                        onChange={(e) =>
                          setEditingVideo({
                            ...editingVideo,
                            link: e.target.value,
                          })
                        }
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg"
                        placeholder="YouTube link"
                      ></input>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeEditModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleEdit}
                      >
                        Confirm
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

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
                      Do you want to delete {deletingVideo.name}?
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
    </div>
  );
};

export default VideoTable;
