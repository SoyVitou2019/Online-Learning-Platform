export default function SideBar() {
    return (
        <div className="h-screen">
            <button
                type="button"
                className="flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="logo-sidebar"
                className=" top-0 left-0 z-40 w-full h-full transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full w-80 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
                    <a href="#" className="flex items-center ps-2.5 mb-5">
                        <i
                            className="bi bi-person-square w-20 text-6xl "
                            style={{ color: "white" }}
                        ></i>
                        <div className="flex-col px-3">
                            <div className="text-white text-xs">Student</div>
                            <span className="text-xl whitespace-nowrap dark:text-white">
                                Eong Koungmeng
                            </span>
                            <div className="text-white text-xs">Followers: 15</div>
                        </div>
                        <i
                            className="bi bi-list text-2xl px-2 align-middle"
                            style={{ color: "white" }}
                        ></i>
                    </a>
                    <hr></hr>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <i className="bi bi-house-gear-fill text-2xl"></i>
                                <span className="ms-3">Home</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <i className="bi bi-person-lines-fill text-2xl"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <i className="bi bi-app-indicator text-2xl"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Notification
                                </span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-400 bg-blue-100 rounded-full dark:bg-blue-700 dark:text-blue-300">
                                    3
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <i className="bi bi-currency-dollar text-2xl"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Donate</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <i className="bi bi-caret-right-square text-2xl"></i>
                                <span className="flex-1 ms-3 whitespace-nowrap">Teach</span>
                            </a>
                        </li>
                        <hr></hr>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Continue learning
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
