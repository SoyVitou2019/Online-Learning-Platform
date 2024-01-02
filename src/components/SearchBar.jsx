import { useState, useEffect } from "react";
import axios from "axios";
import END_POINTS from "../constants/endpoints";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  useEffect(() => {
    // Fetch data from JSON Server when the component mounts
    axios.get(END_POINTS.COURSE).then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    // Filter data based on the search value
    const filteredData = data.filter((item) =>
      item.course_name.toLowerCase().includes(searchValue?.toLowerCase())
    );
    setSearchResults(filteredData.slice(0, 5));
    setSelectedItem(-1); // Reset selected item on each search update
  }, [data]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      e.preventDefault();
      setSelectedItem(selectedItem - 1);
      setSearchValue(searchResults[selectedItem - 1].course_name);
    } else if (
      e.key === "ArrowDown" &&
      selectedItem < searchResults.length - 1
    ) {
      setSelectedItem(selectedItem + 1);
      setSearchValue(searchResults[selectedItem + 1].course_name);
    }
  };

  const handleHover = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    // Focus on the input and set the cursor position after changing the search value
  }, [searchValue]);
  console.log(searchResults);

  return (
    <>
      <div className="flex items-center space-x-6">
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
          className="ml-2 outline-none bg-transparent"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          autoComplete="off"
          value={searchValue}
          onInput={(e) => {
            console.log("type");
            setSearchValue(e.target.value);
            const filteredData = data.filter((item) =>
              item.course_name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            );
            setSearchResults(filteredData.slice(0, 5));
            setSelectedItem(-1);
          }}
          onFocus={() => {
            setIsFocused(true);
            const filteredData = data.filter((item) =>
              item.course_name.toLowerCase().includes("")
            );
            setSearchResults(filteredData.slice(0, 5));
            setSelectedItem(-1);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />

        <button
          className={`text-gray-600 ${searchValue ? "visible" : "invisible"}`}
          onClick={handleClearSearch}
          title="Clear search"
        >
          x
        </button>
      </div>
      {/* Display search suggestions */}
      {isFocused && searchResults.length > 0 && (
        <div className="absolute w-72 top-16 bg-white border rounded-md p-2">
          {searchResults.map((result, index) => (
            <p
              className={`w-full p-3 ${
                selectedItem === index ? "bg-gray-100" : ""
              }`}
              key={result.id}
              onMouseEnter={() => handleHover(index)}
            >
              {result.course_name}
            </p>
          ))}
        </div>
      )}

      {/* Display matching results */}
      {isFocused && searchResults.length === 0 && searchValue && (
        <div className="absolute w-72 top-16 bg-white border rounded-md p-2">
          <p className="p-3">No matching result found</p>
        </div>
      )}
    </>
  );
};

export default SearchBar;
