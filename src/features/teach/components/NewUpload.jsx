import { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import END_POINTS from "@/src/constants/endpoints";
import Swal from "sweetalert2";
import { youtubeKey } from "../../auth/api/client";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/api/Auth";
const VideoTable = () => {
  const [videos, setVideos] = useState([]);

  const [course, setCourse] = useState();

  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState({ link: "" });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addingVideo, setAddingVideo] = useState({ link: "" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingVideo, setDeletingVideo] = useState({ link: "" });
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([
    { title: "Mathematic", id: 1 },
    { title: "Mathematic", id: 1 },
    { title: "Mathematic", id: 1 },
  ]);

  const [selected, setSelected] = useState({ title: "Mathematic", id: 1 });

  const [userID, setUserID] = useState(null);
  const { user } = useAuth();

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
      fetchUser();
    }
  }, [userID, user]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(END_POINTS.CATEGORY);
        setCategories(response.data);
        setSelected(categories[0]);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

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

  //   const handleDelete = (id) => {
  //
  //   };

  function validVideoId(id) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
      img.onload = function () {
        resolve(checkThumbnail(this.width));
      };
      img.onerror = function () {
        reject("Error loading image");
      };
    });
  }

  function checkThumbnail(width) {
    //HACK a mq thumbnail has width of 320.
    //if the video does not exist(therefore thumbnail don't exist), a default thumbnail of 120 width is returned.
    if (width === 120) {
      return false;
    }
    return true;
  }

  // add modal
  const openAddModal = () => {
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAdd = async () => {
    setAddModalOpen(false);
    const regex =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

    // Extract video ID from the input link using the regex
    const match = addingVideo.link.match(regex);

    let videoData = {};

    videoData.link = addingVideo.link;

    let isValid = false;
    if (match && match[7].length == 11) {
      isValid = await validVideoId(match[7]);
      console.log(isValid);
    }

    setAddingVideo({ link: "" });
    if (isValid === false) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: "YouTube link invalid",
      });
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${match[7]}&key=${youtubeKey}`
      );

      if (response.data.items.length > 0) {
        videoData.name = response.data.items[0].snippet.title;
        videoData.id =
          videos.length !== 0 ? videos[videos.length - 1].id + 1 : 1;

        setVideos((prevVideos) => [...prevVideos, videoData]);
      } else {
        console.error("No video details found.");
        return;
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  // edit modal
  const openEditModal = (video) => {
    setEditModalOpen(true);
    setEditingVideo(video);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEdit = async () => {
    setEditModalOpen(false);

    const regex =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

    // Extract video ID from the input link using the regex
    const match = editingVideo.link.match(regex);

    let videoData = {};

    videoData.link = editingVideo.link;

    let isValid = false;
    if (match && match[7].length == 11) {
      isValid = await validVideoId(match[7]);
      console.log(isValid);
    }

    if (isValid === false) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: "YouTube link invalid",
      });
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${match[7]}&key=${youtubeKey}`
      );

      if (response.data.items.length > 0) {
        videoData.name = response.data.items[0].snippet.title;

        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === editingVideo.id ? { ...video, ...videoData } : video
          )
        );
      } else {
        console.error("No video details found.");
        return;
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };
  function getCurrentDateTimeFormatted() {
    const now = new Date();

    // Get the components of the date and time
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Format the date and time
    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }
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
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== deletingVideo.id)
    );
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

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    console.log(courseData);
    console.log(videos);

    if (
      !courseData.courseName ||
      !selected.title ||
      !courseData.courseDescription ||
      !courseData.courseExpectations ||
      videos.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: "Please fill in the form and add videos",
      });
      setLoading(false);
      return;
    }

    let courseVidID = "";
    let arrID = [];
    await Promise.all(
      videos.map(async (vid, index) => {
        let vid_id;
        const regex =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        // Extract video ID from the input link using the regex
        const match = vid.link.match(regex);

        if (match && match[7].length == 11) {
          vid_id = match[7];
        }
        let postVidData = {};
        postVidData.title = vid.name;
        postVidData.vid_id = vid_id;

        if (index === 0) {
          courseVidID = vid_id;
        }
        console.log(postVidData);
        const response = await axios.post(END_POINTS.POST, postVidData);
        arrID = [...arrID, response.data.id];
        console.log(arrID);
      })
    );

    //post data to course
    let postCourseData = {};

    postCourseData.course_name = courseData.courseName;
    postCourseData.vid_id = courseVidID;
    postCourseData.couse_description = courseData.courseDescription;
    postCourseData.created_by_user_id = userID;
    postCourseData.created_at = getCurrentDateTimeFormatted();
    postCourseData.category = selected.title;
    postCourseData.rank = 10;
    postCourseData.posts = arrID;
    console.log(arrID);
    postCourseData.course_expectation =
      courseData.courseExpectations.split("\n");

    // "course_name": "ដេរីវេ second",
    //   "vid_id": "LZ7SFpCiekU",
    //   "couse_description": "សូមអភ័យទោសរាល់កំហុសខុសឆ្គងទាំងឡាយណាក្នុងវីដេអូ​ សូមអរគុណ។",
    //   "created_by_user_id": "2",
    //   "created_at": "2022-02-01 21:05:02",
    //   "category": "Mathematic",
    //   "rank": 2,
    //   "posts": [
    //     4,
    //     5,
    //     6
    //   ],
    //   "course_expectation": [
    //     "You will master derivative",
    //     "You will pass grade 12",
    //     "You will pass ICT entrace",
    //     "You will get A++",
    //     "Understand the universe"
    //   ],
    //   "id": 28
    try {
      await axios.post(END_POINTS.COURSE, postCourseData);
      Swal.fire({
        icon: "success",
        title: "Course uploaded",
      });
      navigate("/");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Cannot upload",
        text: e,
      });
    }

    setLoading(false);
  };

  console.log(videos);
  return (
    <div className="mb-32">
      {/* header */}
      <div className="px-5 flex justify-start border-t border-b border-gray-300">
        <Link
          to="/teacher/upload"
          className=" p-4 py-2 text-md font-medium text-center"
        >
          Course
        </Link>
        <Link to="/teach/dashboard" className=" p-4  py-2 text-md font-medium ">
          Dashboard
        </Link>
        <button
          className=" p-4  py-2 text-md font-medium ml-auto bg-green-200 "
          onClick={handleSubmit}
        >
          Publish
        </button>
      </div>
      <p className="font-bold pl-9 pt-4 ">Upload Videos</p>

      {/* course data form */}

      <div className="flex flex-col justify-center items-stretch">
        <div className="p-4 mx-32 mt-5">
          <div className="flex flex-col ">
            <div className="flex gap-4 ">
              <div className="mb-4 w-full">
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

              <div className="mb-4 w-full">
                <label
                  htmlFor="courseCategory"
                  className="block text-sm font-medium text-gray-600"
                >
                  Course Category
                </label>
                <div className="w-full ">
                  <Listbox value={selected.title} onChange={setSelected}>
                    <div className="relative top-1">
                      <Listbox.Button className="relative w-full cursor-default bg-pink-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate cursor-pointer h-6">
                          {selected.title}
                        </span>
                        <span className="pointer-events-none  absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute  mt-1 max-h-60 w-full overflow-auto rounded-md bg-pink-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {categories.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-red-200 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={person}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {person.title}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
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
        <div className=" mx-32 p-4">
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
              {videos &&
                videos.map((video) => (
                  <tr key={video.id}>
                    <td className="py-2 px-4 border-b text-center">
                      <p className=" text-ellipsis line-clamp-1">{video.id}</p>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <p className=" text-ellipsis line-clamp-1">
                        {video.name}
                      </p>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <Link
                        to={video.link}
                        target="_blank"
                        className=" text-ellipsis line-clamp-1 text-blue-700 underline"
                      >
                        {video.link}
                      </Link>
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
                      value={addingVideo.link}
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
                      onClick={async () => {
                        await handleAdd();
                      }}
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
  );
};

export default VideoTable;
