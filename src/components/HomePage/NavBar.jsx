import { Link } from "react-router-dom";
import DropDownCategory from "../DropDownCategory";
import SearchBar from "../SearchBar";
import { useEffect, useRef, useState } from "react";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    });
  });

  return (
    <nav className="flex justify-between px-10 py-5 items-center bg-gray-50">
      <ul className="flex items-center space-x-6">
        <Link to="/" className="text-xl text-gray-800 font-bold">
          VM
        </Link>
        <Link to="/" className=" text-xl text-gray-800">
          <DropDownCategory />
        </Link>
      </ul>
      <ul className="flex items-center space-x-6">
        <div>
          <div className={showSearch ? "block" : "hidden"}>
            <SearchBar />
          </div>
          <p
            onClick={() => {
              setShowSearch(true);
            }}
            className={
              showSearch
                ? "hidden"
                : "bg-red-50 px-10 py-1 rounded-xl font-serif sm:hidden"
            }
          >
            Search ...
          </p>
        </div>
        <i
          ref={menuRef}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="bi bi-list absolute right-8 sm:hidden"
        ></i>
        {/* dropdown */}
        <div
          ref={menuRef}
          className={showMenu ? "absolute right-0 top-10 sm:hidden" : "hidden"}
        >
          <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link
                to="/contact-us"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Contact us
              </Link>
              <Link
                to="/donate"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </ul>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <Link
            to="/contact-us"
            className="hidden sm:block font-semibold text-gray-700"
          >
            Contact us
          </Link>
          <Link
            to="/donate"
            className="hidden sm:block font-semibold text-gray-700"
          >
            Donate
          </Link>
        </ul>
      </div>
    </nav>
  );
};
