import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <nav className="flex justify-between px-20 py-5 items-center bg-orange-50">
      <ul className="flex items-center space-x-6">
        <Link to="/" className="text-xl text-gray-800 font-bold">
          VM
        </Link>
        <Link to="/" className="text-xl text-gray-800">
          Categories
        </Link>
      </ul>
      <ul className="flex items-center space-x-6">
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
        <input
          className="ml-2 outline-none bg-transparent font-"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
        />
      </ul>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <Link to="/" className="font-semibold text-gray-700">
            Contact us
          </Link>
          <Link to="/" className="font-semibold text-gray-700">
            Donate
          </Link>
        </ul>
      </div>
    </nav>
  );
};
