import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import getUser from '../api/getUser';

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  let [isOpen, setIsOpen] = useState(false)
  const users = getUser()
  function closeRequestModal() {
    setIsOpen(false)
  }

  function openRequestModal() {
    setIsOpen(true)
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
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
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg" placeholder="Write your thoughts here..."></textarea>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      className="flex justify-end rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeRequestModal}
                    >
                      Cancle
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
      <div className="h-screen">
        {/* Header */}
        <div className="border-y-2">
          <div className="flex px-12 items-center py-2 ">
            <div className=" flex gap-14 pl-16 ">
              <p>Users</p>
              <p>Courses</p>
              <p>Inbox</p>
            </div>
            <div className=" flex gap-24 justify-end items-center flex-grow">
              <form className=" w-96">
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
                    required
                  />
                </div>
              </form>
              <button onClick={() => setIsOpen(true)}>Upload</button>
            </div>
          </div>
        </div>
        {/* filter */}
        <div className="border-y-2">
          <div className="flex gap-14 items-center py-2 px-36">
            {/* button1 */}
            <div className="flex gap-2 bg-white text-black py-2 px-4 rounded hover:bg-slate-100 active:bg-green-300">
              <i className="bi bi-people"></i>
              <button className=""> User: All</button>
            </div>
            {/* button2 */}
            <div className="flex gap-2 bg-white text-black py-2 px-4 rounded hover:bg-slate-100 active:bg-green-300">
              <i className="bi bi-chat-left-dots"></i>
              <button className=""> Requested</button>
            </div>
            {/* button3 */}
            <div className="flex gap-2 bg-white text-black py-2 px-4 rounded hover:bg-slate-100 active:bg-green-300">
              <i className="bi bi-calendar2-check"></i>
              <button className=""> Sort by: Date</button>
            </div>
            {/* button4 */}
            <div className="flex gap-2 bg-white text-black py-2 px-4 rounded hover:bg-slate-100 active:bg-green-300">
              <i className="bi bi-sort-down-alt"></i>
              <button className=""> Filter</button>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto">
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
            {/* user requested */}
            <tbody>
              <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-black">
                  1
                </th>
                <td className="px-6 py-4">
                  <i
                    className="bi bi-person-circle w-20 text-6xl "
                    style={{ color: "black" }}
                  ></i>
                </td>
                <td className="px-6 py-4">Eong Koungmeng</td>
                <td className="px-6 py-4">19 Jan 2012</td>
                <td className="px-6 py-4">Student</td>
                <td className="px-6 py-4">
                  <div className="flex gap-7">
                    <button
                      onClick={handleOpenModal}
                      className=" bg-lime-500 hover:bg-lime-400 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>
                    <i className="bi bi-trash bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MOdal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center">
          <div
            id="alert-additional-content-1"
            className={`${openModal ? "" : "hidden"
              } w-full bg-green-200 p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg  `}
            role="alert"
          >
            <div className="flex items-center">
              <i className="bi bi-envelope-arrow-down px-4"></i>
              <span className="sr-only">Info</span>
              <div className="flex gap-9">
                <h3 className="text-lg font-medium">Name: Guido van Rossum</h3>
                <div className="">
                  <i
                    className="bi bi-x-square"
                    style={{ color: "blue" }}
                    onClick={handleCloseModal}
                  ></i>
                </div>
              </div>
            </div>
            <div className="mt-2 mb-4 text-sm">
              We extend a warm invitation to join our community, VM (Vitou
              Koungmeng), dedicated to the creation of free educational videos
              that empower learners around the globe. By becoming a VM teacher,
              you have the opportunity to play a pivotal role in making
              high-quality education accessible to everyone. As a member of VM,
              you &apos ll be part of a collaborative and passionate community
              of like-minded educators, sharing your expertise to positively
              impact individuals who may lack traditional learning resources.
              Imagine the global reach and influence your teachings can have,
              transcending geographical boundaries and contributing to a more
              knowledgeable and interconnected world. At VM, we value your
              unique contributions, offering the flexibility to create content
              aligned with your expertise while providing recognition and
              appreciation for your commitment to education. Join us in this
              transformative journey, where your passion for teaching becomes a
              beacon of light for those seeking knowledge. Respond to this
              invitation, and let &apos s together make education a universally
              accessible force for positive change. Sincerely.
              <br />
              <br />
              [Guido van Rossum] <br />
              [VM Community]
            </div>
            <div className="flex">
              <button
                onClick={handleCloseModal}
                type="button"
                className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i
                  className="bi bi-check-all px-2"
                  style={{ color: "white" }}
                ></i>
                Accept
              </button>
              <button
                onClick={handleCloseModal}
                type="button"
                className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i className="bi bi-ban px-2" style={{ color: "red" }}></i>
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Admin;
