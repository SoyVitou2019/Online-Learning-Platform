import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import END_POINTS from "../../../constants/endpoints";
import axios from "axios";
import { useAuth } from "../../auth/api/Auth";
import Swal from "sweetalert2";

export const Request = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currUser, setCurrUser] = useState({});

  const [formData, setFormData] = useState({
    user_id: "",
    phoneNumber: "",
    request_msg: "",
  });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchProfile = async () => {
      try {
        const response = await axios.get(END_POINTS.USER + `?uid=${user.id}`);
        console.log(END_POINTS.USER + `?uid=${user.id}`);
        console.log(response);
        setCurrUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call the fetch function
    fetchProfile();
  }, []); // E

  function openRequestModal() {
    console.log(currUser.id);
    setFormData({
      user_id: currUser.id,
      phoneNumber: "",
      request_msg: "",
    });
    console.log(formData);

    setIsOpen(true);
  }

  function closeRequestModal() {
    setIsOpen(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async () => {
    closeRequestModal();

    const phoneRegex = /^\d{9,10}$/; // Assumes a 10-digit phone number format
    if (!phoneRegex.test(formData.phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: "Phone number is incorrect format",
      });
      return;
    }
    console.log(formData);

    await axios.post(END_POINTS.USER_REQUEST, formData);
  };
  const role = [
    {
      tag: "Content Relevance Policy",
      description:
        "Members are encouraged to share videos that align with the community's theme or purpose. The policy may specify that content should be relevant, interesting, and contribute positively to the community. Videos promoting personal products or unrelated topics may be subject to removal.",
    },
    {
      tag: "No Spam or Self-Promotion",
      description:
        "To maintain the quality of the community, a policy can be established against spam and excessive self-promotion. Members are discouraged from posting multiple videos in a short time span solely for self-promotion purposes. This helps ensure that the community remains a space for genuine content sharing rather than a platform for advertising.",
    },
    {
      tag: "Respectful Communication Policy",
      description:
        "Emphasizing respectful communication is important in any community. The policy may include guidelines on providing constructive feedback, avoiding hate speech, and treating fellow members with courtesy. This creates a positive and supportive environment for video creators and viewers alike.",
    },
    {
      tag: "Copyright Compliance",
      description:
        "A policy on copyright compliance is crucial for a community centered around sharing videos. Members should be informed that they are responsible for ensuring they have the right to share the content they post. Encouraging the use of original content or properly credited content helps avoid legal issues and ensures fair use practices.",
    },
    {
      tag: "Community Moderation Guidelines",
      description:
        "Establishing clear guidelines for community moderators is essential. This policy may outline the criteria for content removal, member warnings, and potential bans. Moderators should act impartially and consistently, following the community's values and guidelines when making decisions.",
    },
  ];
  return (
    <div className="">
      <p className="text-4xl mt-8 ml-8 font-serif">
        Do you want to be a teacher?
      </p>
      <hr className="mt-4" />
      <p className="indent-8 text-wrap break-all px-2">
        As a teacher in a community that prioritizes technology, you have the
        unique opportunity to shape the future by empowering students with
        essential digital skills. By integrating technology into your teaching
        methods, you not only enhance the learning experience but also prepare
        students for the rapidly evolving digital landscape. Your role goes
        beyond traditional education; you become a guide, mentor, and
        facilitator of knowledge in the digital age. Embracing technology in
        education allows you to foster creativity, critical thinking, and
        problem-solving skills in your students, ensuring they are well-equipped
        to thrive in an increasingly tech-driven world. As a tech-savvy
        educator, you contribute to building a community that values innovation,
        adaptability, and lifelong learning, making a lasting impact on both
        individual lives and the collective progress of society.
      </p>
      <div className="flex">
        <p className="text-xl font-extralight mt-8 ml-8 select-none">
          Here is the roles and policy to be a teacher in our community
        </p>
        <div>
          <div
            onClick={openRequestModal}
            className="flex justify-center select-none"
          >
            <button
              type="button"
              className="px-14 py-2 mt-8 ml-9 text-xs font-medium text-center inline-flex items-center text-white bg-pink-500 rounded-lg hover:bg-pink-700 "
            >
              <svg
                className="h-3 text-white me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
              Send Mail
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-4" />

      <div className="w-full pt-3">
        <div className="mx-auto w-full rounded-2xl bg-white p-2">
          {role.map((item, idx) => (
            <Disclosure as="div" key={idx} className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span className="select-none">
                      {idx + 1}. {item.tag}
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    <p className="font-bold select-none">Objective & Purpose</p>
                    <p className="indent-2">{item.description}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      <hr className="my-4" />

      <hr className="my-4" />
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

                  <form className="max-w-sm mx-auto mt-5">
                    <label
                      htmlFor="phone-input"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Phone number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 19 18"
                        >
                          <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="phone-input"
                        value={formData.phoneNumber}
                        name="phoneNumber"
                        onChange={handleChange}
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5  "
                        placeholder="012345678"
                        required
                      />
                    </div>
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      Select a phone number that matches the format.
                    </p>
                  </form>

                  <div className="mt-5">
                    <label
                      htmlFor="request_msg"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Write your reason here
                    </label>
                    <textarea
                      id="request_msg"
                      name="request_msg"
                      value={formData.request_msg}
                      onChange={handleChange}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      The reason should be related to your experience.
                    </p>
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
                      onClick={handleSubmit}
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
    </div>
  );
};
