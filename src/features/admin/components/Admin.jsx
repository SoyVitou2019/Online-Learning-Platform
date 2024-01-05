import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import END_POINTS from "../../../constants/endpoints";

import axios from "axios";
import { supabaseAuth } from "../../auth/api/client";
import AdminCourseDashboard from "./AdminCourseDashboard";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [identifyRequestModel, setIdentifyRequestModel] = useState();
  const [clickDelete, setClickDelete] = useState();
  const [roleDisplay, setRoleDisplay] = useState("users");
  const [users, setStateOfUser] = useState([]);
  const [allusers, setStateOfAllUser] = useState([]);

  const [isOpenPromoteUser, setIsOpenPromoteUser] = useState(false);
  const [currentPromoteID, setCurrentPromoteID] = useState();

  const [searchValue, setSearchValue] = useState("");

  const fetchAllUser = async () => {
    try {
      const response1 = await axios.get(END_POINTS.USER_SORT);
      const userMsgs = response1.data;
      // Sort userMsgs by user_id
      // userMsgs.sort((a, b) => a.id - b.id);
      // Fetch user information for each user request

      const filteredUsers = userMsgs.filter((item) => {
        const fullName = (item.firstName + " " + item.lastName).toLowerCase();
        return fullName.includes(searchValue.toLowerCase());
      });

      const userPromises = filteredUsers.map(async (item) => {
        return {
          userId: item.id,
          userProfile: item.profileUrl,
          fullName: item.firstName + " " + item.lastName,
          created_at: item.created_at.slice(0, 10),
          role: item.role,
        };
      });

      // Wait for all user information requests to complete
      const userInfoResults = await Promise.all(userPromises);

      // Update state with the combined user information
      setStateOfAllUser(userInfoResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response1 = await axios.get(END_POINTS.USER_REQUEST);

      const userMsgs = response1.data; // Assuming the API response is an array of user requests

      // Fetch user information for each user request
      const userPromises = userMsgs.map(async (item) => {
        const response2 = await axios.get(END_POINTS.USER + "/" + item.user_id);

        return {
          userId: item.user_id,
          userProfile: response2.data.profileUrl,
          fullName: response2.data.firstName + " " + response2.data.lastName,
          created_at: response2.data.created_at.slice(0, 10),
          role: response2.data.role,
          message: item.request_msg,
          id: item.id,
        };
      });

      // Wait for all user information requests to complete
      const userInfoResults = await Promise.all(userPromises);

      const filteredUsers = userInfoResults.filter((item) => {
        const fullName = item.fullName.toLowerCase();
        return fullName.includes(searchValue.toLowerCase());
      });
      // Update state with the combined user information
      setStateOfUser(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, [roleDisplay, searchValue]);

  useEffect(() => {
    fetchUser();
  }, [roleDisplay, searchValue]);

  function openRequestModal() {
    setIsOpen(true);
  }

  function closeRequestModal() {
    setIsOpen(false);
  }

  function openDeleteUserModal(id) {
    setClickDelete(id);
    setIsOpenDeleteUser(true);
  }

  function openPromoteUserModal(id) {
    setCurrentPromoteID(id);
    setIsOpenPromoteUser(true);
  }
  const closeDeleteUserModal = async (idDelete) => {
    const response = await axios.get(END_POINTS.USER + "/" + idDelete);

    const { data, error } = await supabaseAuth.auth.admin.deleteUser(
      response.data.uid
    );
    await axios.delete(END_POINTS.USER + "/" + idDelete);
    users.map(async (item) => {
      if (item.userId === idDelete) {
        try {
          await axios.delete(END_POINTS.USER_REQUEST + item.id);
        } catch (e) {
          console.log("This user doesn't have request message");
        }
      }
    });

    fetchAllUser();
    fetchUser();

    setIsOpenDeleteUser(false);
  };

  const closePromoteUserModal = async (idDelete) => {
    setIsOpenPromoteUser(false);
    console.log(idDelete);
    console.log(users);
    allusers.map(async (item) => {
      console.log("map1");
      if (item.userId === idDelete) {
        try {
          console.log(item);

          let response = await axios.get(END_POINTS.USER + "/" + item.userId);
          response.data.role = "admin";

          users.map(async (item) => {
            if (item.userId === idDelete) {
              try {
                await axios.delete(END_POINTS.USER_REQUEST + item.id);
              } catch (e) {
                console.log("This user doesn't have request message");
              }
            }
          });

          await axios.put(END_POINTS.USER + "/" + item.userId, response.data);
          fetchAllUser();
          fetchUser();
        } catch (e) {
          console.error("Something went wrong!");
          console.log(e);
        }
      }
    });
  };

  const closeDeleteUserModalWithoutDelete = () => {
    setIsOpenDeleteUser(false);
  };

  const closeAndRejectRequest = async (idDelete) => {
    setIsOpenMessage(false);
    users.map(async (item) => {
      if (item.userId === idDelete) {
        try {
          await axios.delete(END_POINTS.USER_REQUEST + item.id);
          fetchAllUser();
          fetchUser();
        } catch (e) {
          console.error("Something went wrong!");
        }
      }
    });
  };

  const closeAndAcceptRequest = async (idAccept) => {
    console.log("accept");
    setIsOpenMessage(false);
    users.map(async (item) => {
      if (item.userId === idAccept) {
        try {
          console.log(item);

          let response = await axios.get(END_POINTS.USER + "/" + item.userId);
          response.data.role = "content_creator";

          await axios.delete(END_POINTS.USER_REQUEST + item.id).then(() => {
            axios.put(END_POINTS.USER + "/" + item.userId, response.data);
          });
          fetchAllUser();
          fetchUser();
        } catch (e) {
          console.error("Something went wrong!");
        }
      }
    });
  };
  function closeRequestMessageModal() {
    setIsOpenMessage(false);
  }

  const openRequestMessageModal = (id) => {
    setIdentifyRequestModel(id);
    setIsOpenMessage(true);
  };

  return (
    <section className={`bg-slate-300 ${openRequestModal}`}>
      {/* dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeRequestModal}>
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
                    Do you want to be a teacher for upload video?
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeRequestModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeRequestModal}
                    >
                      Submit to be teacher
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="">
        {/* Header */}
        <div className="border-y-2">
          <div className="flex px-12 items-center py-2 ">
            <div className=" flex gap-14 pl-16 ">
              <button
                onClick={() => {
                  setSearchValue("");
                  setRoleDisplay("users");
                }}
                className={
                  roleDisplay === "users"
                    ? "bg-lime-700 hover:bg-lime-600 text-white px-4 py-2 rounded-lg"
                    : "px-4 py-2"
                }
              >
                All Users
              </button>
              <button
                onClick={() => {
                  setSearchValue("");
                  setRoleDisplay("courses");
                }}
                className={
                  roleDisplay === "courses"
                    ? "bg-lime-700 hover:bg-lime-600 text-white px-4 py-2 rounded-lg"
                    : "px-4 py-2"
                }
              >
                Courses
              </button>
              <button
                onClick={() => {
                  setSearchValue("");
                  setRoleDisplay("inboxs");
                }}
                className={
                  roleDisplay === "inboxs"
                    ? "bg-lime-700 hover:bg-lime-600 text-white px-4 py-2 rounded-lg"
                    : "px-4 py-2"
                }
              >
                Inbox
              </button>
            </div>
            <div className=" flex gap-24 justify-end items-center flex-grow">
              <div className=" w-96">
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
              <button onClick={() => setIsOpen(true)}>Upload</button>
            </div>
          </div>
        </div>

        <div
          className={
            "relative overflow-x-auto " +
            (roleDisplay === "courses" ? "hidden" : "")
          }
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  IMG
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Joined date
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Option
                </th>
              </tr>
            </thead>
            {/* all users */}
            <tbody className={roleDisplay === "users" ? "" : "hidden"}>
              {allusers.map((item, index) => (
                <tr className="bg-white border-b " key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-black">
                    {item.userId}
                  </th>
                  <td className="px-3 py-4 ">
                    <img
                      className="w-12 h-12 object-cover"
                      src={item.userProfile}
                      alt="Description of the image"
                    />
                  </td>
                  <td className="px-6 py-4">{item.fullName}</td>
                  <td className="px-6 py-4">{item.created_at}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center">
                      {item.role !== "admin" && (
                        <>
                          <button
                            className="flex gap-7"
                            onClick={() => {
                              openPromoteUserModal(item.userId);
                            }}
                          >
                            <i className="bi bi-person-fill-gear bg-blue-300 hover:bg-red-400 text-white px-4 py-2 rounded-lg"></i>
                          </button>

                          <button
                            className="flex gap-7"
                            onClick={() => {
                              openDeleteUserModal(item.userId);
                            }}
                          >
                            <i className="bi bi-trash bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* user requested */}
            <tbody className={roleDisplay === "inboxs" ? "" : "hidden"}>
              {users.map((item, index) => (
                <tr className="bg-white border-b " key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-black">
                    {item.userId}
                  </th>
                  <td className="px-3 py-4 w-16">
                    <img
                      src={item.userProfile}
                      alt="Description of the image"
                    />
                  </td>
                  <td className="px-6 py-4">{item.fullName}</td>
                  <td className="px-6 py-4">{item.created_at}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-7">
                      <button
                        id={item.userId}
                        onClick={() => openRequestMessageModal(item.userId)}
                        className=" bg-lime-500 hover:bg-lime-400 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* admin course dashboard */}
            <tbody className={roleDisplay === "courses" ? "" : "hidden"}>
              {users.map((item, index) => (
                <tr className="bg-white border-b " key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-black">
                    {item.userId}
                  </th>
                  <td className="px-3 py-4 w-16">
                    <img
                      src={item.userProfile}
                      alt="Description of the image"
                    />
                  </td>
                  <td className="px-6 py-4">{item.fullName}</td>
                  <td className="px-6 py-4">{item.created_at}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-7">
                      <button
                        id={item.userId}
                        onClick={() => openRequestMessageModal(item.userId)}
                        className=" bg-lime-500 hover:bg-lime-400 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {roleDisplay === "courses" ? (
          <AdminCourseDashboard key={1} searchValue={searchValue} />
        ) : (
          ""
        )}
      </div>

      {/* dialog inbox */}
      <Transition appear show={isOpenMessage} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeRequestMessageModal}
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
                    Requested from{" "}
                    {users.map((item, index) => {
                      return item.userId === identifyRequestModel
                        ? item.fullName
                        : null;
                    })}
                  </Dialog.Title>
                  <p className="text-black">
                    {users.map((item, index) => {
                      return item.userId === identifyRequestModel
                        ? item.message
                        : null;
                    })}
                  </p>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeRequestMessageModal;
                        closeAndRejectRequest(identifyRequestModel);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeRequestMessageModal;
                        closeAndAcceptRequest(identifyRequestModel);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* dialog delete */}
      <Transition appear show={isOpenDeleteUser} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeDeleteUserModalWithoutDelete}
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
                    Do you want to delete{" "}
                    {allusers.map((item, index) => {
                      return item.userId === clickDelete ? item.fullName : null;
                    })}{" "}
                    ?
                  </Dialog.Title>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteUserModalWithoutDelete}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => closeDeleteUserModal(clickDelete)}
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

      {/* dialog promote */}
      <Transition appear show={isOpenPromoteUser} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpenPromoteUser(false);
          }}
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
                    Do you want to promote user{" "}
                    {allusers.map((item, index) => {
                      return item.userId === currentPromoteID
                        ? item.fullName
                        : null;
                    })}
                    {" to ADMIN?"}
                  </Dialog.Title>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closePromoteUserModal(currentPromoteID);
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpenPromoteUser(false);
                      }}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default Admin;
