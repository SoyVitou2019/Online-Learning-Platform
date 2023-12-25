import { useState } from "react";
export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`top-0 left-0 z-40 w-full h-full transition-transform ${
          isSidebarOpen ? "hidden" : "block"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full w-80 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
          <a href="#" className="flex justify-start items-center ps-2.5 mb-5">
            <i
              className="bi bi-person-square w-14 text-5xl "
              style={{ color: "white" }}
            ></i>
            <div className="flex-col px-3 mr-auto">
              <div className="text-white text-xs">Student</div>
              <span className="text-xl whitespace-nowrap dark:text-white">
                Eong Koungmeng
              </span>
              <div className="text-white text-xs">Followers: 15</div>
            </div>
            <button type="button" onClick={toggleSidebar}>
              <i
                className="bi bi-list mr-3 text-2xl align-middle"
                style={{ color: "white" }}
              ></i>
            </button>
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

      <aside
        id="logo-sidebar"
        className={`top-0 left-0 z-40 w-full h-full transition-transform ${
          isSidebarOpen ? "block" : "hidden"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full w-16 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <button type="button" onClick={toggleSidebar}>
              <i
                className="bi bi-list text-2xl align-middle"
                style={{ color: "white" }}
              ></i>
            </button>
            <div className="flex-col px-10">
              <div className="text-white text-xs">Student</div>
              <span className="text-xl whitespace-nowrap dark:text-white">
                Eong Koungmeng
              </span>
              <div className="text-white text-xs">Followers: 15</div>
            </div>
            <button type="button" onClick={toggleSidebar}>
              <i
                className="bi bi-list text-2xl px-2 align-middle"
                style={{ color: "white" }}
              ></i>
            </button>
          </a>
          <hr></hr>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-house-gear-fill text-2xl"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-person-lines-fill text-2xl"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-app-indicator text-2xl"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-currency-dollar text-2xl"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-caret-right-square text-2xl"></i>
              </a>
            </li>
            <hr></hr>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              ></a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
