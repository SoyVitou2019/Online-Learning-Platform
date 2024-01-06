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
    }, []);

    return (
        <nav className="flex justify-between px-10 py-5 items-center bg-gray-50 overflow-hidden">
            <ul className="flex items-center space-x-6">
                <Link to="/" className="text-xl text-gray-800 font-bold">
                    VM
                </Link>
                <Link to="/" className={`text-xl text-gray-800 ${showSearch ? "hidden" : ""}`}>
                    <DropDownCategory />
                </Link>
            </ul>
            <ul className="flex items-center space-x-6">
                <div>
                    <div className={showSearch ? "w-32 flex items-center" : "hidden md:block "}>
                        <SearchBar onBlur={() => setShowSearch(false)} shouldFocus={showSearch} isSmall={true} />
                    </div>
                    <p
                        onClick={() => {
                            setShowSearch(true);
                        }}
                        className={
                            showSearch
                                ? "hidden"
                                : "bg-red-50 px-10 py-1 rounded-xl font-serif md:hidden"
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 pt-0.5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </p>
                </div>
                <i
                    ref={menuRef}
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                    className="bi bi-list absolute right-8 md:hidden"
                ></i>
                {/* dropdown */}
                <div
                    ref={menuRef}
                    className={showMenu ? "absolute right-0 top-10 md:hidden" : "hidden"}
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
                        className="hidden md:block font-semibold text-gray-700"
                    >
                        Contact us
                    </Link>
                    <Link
                        to="/donate"
                        className="hidden md:block font-semibold text-gray-700"
                    >
                        Donate
                    </Link>
                </ul>
            </div>
        </nav>
    );
};
