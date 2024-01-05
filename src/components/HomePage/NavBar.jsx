import { Link } from "react-router-dom";
import DropDownCategory from "../DropDownCategory";
import SearchBar from "../SearchBar";

export const NavBar = () => {
    return (
        <nav className="flex justify-between px-20 py-5 items-center bg-white">
            <ul className="flex items-center space-x-6">
                <Link to="/" className="text-xl text-gray-800 font-bold">
                    VM
                </Link>
                <Link to="/" className="text-xl text-gray-800">
                    <DropDownCategory />
                </Link>
            </ul>
            <ul className="flex items-center space-x-6">
                <SearchBar />
            </ul>
            <div className="flex items-center">
                <ul className="flex items-center space-x-6">
                    <Link to="/contact-us" className="font-semibold text-gray-700">
                        Contact us
                    </Link>
                    <Link to="/donate" className="font-semibold text-gray-700">
                        Donate
                    </Link>
                </ul>
            </div>
        </nav>
    );
};
