import React from "react";
import { useState } from "react";

const AdminPage = () => {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }


    return (
        <section className={`bg-slate-300 ${openModal}`}>
            <div className="">
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
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full rounded-2xl p-2 ps-10 text-sm text-gray-900 border border-gray-300" placeholder="Search" required />
                                </div>
                            </form>
                            <p>Upload</p>
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
                            <i class="bi bi-chat-left-dots"></i>
                            <button className=""> Requested</button>
                        </div>
                        {/* button3 */}
                        <div className="flex gap-2 bg-white text-black py-2 px-4 rounded hover:bg-slate-100 active:bg-green-300">
                            <i class="bi bi-calendar2-check"></i>
                            <button className=""> Sort by: Date</button>
                        </div>
                        {/* button4 */}
                        <div className="flex gap-2 bg-white text-black py-2 px-4 rounded hover:bg-slate-100 active:bg-green-300">
                            <i class="bi bi-sort-down-alt"></i>
                            <button className=""> Filter</button>
                        </div>
                    </div>
                </div>


                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    IMG
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Joined date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Option
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b ">
                                <th scope="row" class="px-6 py-4 font-medium text-black">
                                    1
                                </th>
                                <td class="px-6 py-4">
                                    <i className="bi bi-person-circle w-20 text-6xl " style={{ color: 'black' }}></i>
                                </td>
                                <td class="px-6 py-4">
                                    Eong Koungmeng
                                </td>
                                <td class="px-6 py-4">
                                    19 Jan 2012
                                </td>
                                <td class="px-6 py-4">
                                    Student
                                </td>
                                <td class="px-6 py-4">
                                    <div className="flex gap-7">
                                        <button onClick={handleOpenModal} className=" bg-lime-500 hover:bg-lime-400 text-white px-4 py-2 rounded-lg">View</button>
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
                    <div id="alert-additional-content-1" className={`${openModal ? '' : 'hidden'} w-full bg-green-200 p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg  `} role="alert">
                        <div class="flex items-center">
                            <i class="bi bi-envelope-arrow-down px-4"></i>
                            <span class="sr-only">Info</span>
                            <div className="flex gap-9">
                                <h3 class="text-lg font-medium">Name: Guido van Rossum</h3>
                                <div className=""><i class="bi bi-x-square" style={{ color: 'blue' }} onClick={handleCloseModal}></i></div>
                            </div>
                        </div>
                        <div class="mt-2 mb-4 text-sm">
                            We extend a warm invitation to join our community, VM (Vitou Koungmeng),
                             dedicated to the creation of free educational videos that empower learners around the globe.
                              By becoming a VM teacher, you have the opportunity to play a pivotal role in making high-quality
                               education accessible to everyone. As a member of VM, you'll be part of a collaborative and passionate
                                community of like-minded educators, sharing your expertise to positively impact individuals who may
                                 lack traditional learning resources. Imagine the global reach and influence your teachings can have,
                                  transcending geographical boundaries and contributing to a more knowledgeable and interconnected world.
                                   At VM, we value your unique contributions, offering the flexibility to create content aligned with your
                                    expertise while providing recognition and appreciation for your commitment to education. 
                                    Join us in this transformative journey, where your passion for teaching becomes a beacon of 
                                    light for those seeking knowledge. Respond to this invitation,
                             and let's together make education a universally accessible force for positive change.
                            Sincerely.<br/><br/>
                            [Guido van Rossum] <br/>
                            [VM Community]
                        </div>
                        <div class="flex">
                            <button  onClick={handleCloseModal} type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <i class="bi bi-check-all px-2" style={{ color: 'white' }}></i>
                                Accept
                            </button>
                            <button  onClick={handleCloseModal} type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <i class="bi bi-ban px-2" style={{ color: 'red' }}></i>
                                Decline
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default AdminPage