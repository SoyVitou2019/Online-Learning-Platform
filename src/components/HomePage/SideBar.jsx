import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/api/Auth";
import axios from "axios";
import END_POINTS from "../../constants/endpoints";
import SignOut from "../SignOut";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchProfile = async () => {
      try {
        const response = await axios.get(END_POINTS.USER + `?uid=${user.id}`);

        setCurrUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Call the fetch function
    fetchProfile();
  }, []); // Empty dependency array ensures that the effect runs only once (on mount)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex ">
      <aside
        id="logo-sidebar"
        className={`w-72  ${isSidebarOpen ? "hidden" : "block"} `}
        aria-label="Sidebar"
      >
        <div className="h-full  px-3 py-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-start items-center ps-2.5 mb-5">
            <Link to="/profile">
              <i
                className="bi bi-person-square w-14 text-5xl "
                style={{ color: "white" }}
              ></i>
            </Link>
            <Link to="/profile" className="flex-col ps-5 mr-auto">
              <div className="text-white text-xs">{currUser.role}</div>
              <span className="text-xl text-overflow: ellipsis whitespace-nowrap dark:text-white">
                {currUser.firstName && currUser.firstName.length > 0
                  ? currUser.firstName[0] + ". " + (currUser.lastName || "")
                  : ""}
              </span>
              <div className="text-white text-xs">Followers: 15</div>
            </Link>
            <button type="button" onClick={toggleSidebar}>
              <i
                className="bi bi-list mr-3 text-2xl align-middle"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <hr></hr>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-house-gear-fill text-2xl"></i>
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/following"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-box2-heart text-2xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Following</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-person-lines-fill text-2xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>

            <>
              <Link
                to={
                  currUser.role === "admin" ||
                  currUser.role === "content_creator"
                    ? "/teach/upload"
                    : "teach/request"
                }
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-play-fill text-2xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Teach</span>
              </Link>
            </>
            {currUser.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <i className="bi bi-bar-chart text-2xl"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
                </Link>
              </li>
            )}

            <hr></hr>
            <li>
              <SignOut />
            </li>
          </ul>
        </div>
      </aside>

      <aside
        id="logo-sidebar"
        className={`top-0 left-0 z-40 w-full h-full overflow-hidden transition-transform ${
          isSidebarOpen ? "block" : "hidden"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-screen w-16 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center ps-2.5 mb-5">
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
          </div>
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
                <i className="bi bi-box2-heart text-2xl"></i>
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
                <i className="bi bi-play-fill text-2xl"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-bar-chart text-2xl"></i>
              </a>
            </li>
            <hr></hr>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="bi bi-box-arrow-left text-2xl"></i>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
