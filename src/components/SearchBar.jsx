import { useState, useEffect, useRef } from "react";
import axios from "axios";
import END_POINTS from "../constants/endpoints";
import { useNavigate, Link } from "react-router-dom";

const SearchBar = ({ onBlur = () => { }, autoFocus = (e, f) => { }, shouldFocus = false, isSmall = false }) => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [isMobile, setIsMobile] = useState(isSmall);

    const handleClearSearch = () => {
        setSearchValue("");
    };

    const showSearchDropdown = () => {
        setIsFocused(true);
        const filteredData = data.filter((item) =>
            item.course_name.toLowerCase().includes("")
        );
        setSearchResults(filteredData.slice(0, 5));
        setSelectedItem(-1);
    }

    useEffect(() => {
        // Fetch data from JSON Server when the component mounts
        axios.get(END_POINTS.COURSE).then((response) => {
            setData(response.data);
        });
    }, []);

    // useEffect(() => {
    //     setIsFocused(true);
    //     showSearchDropdown()
    //     setSearchResults(filteredData.slice(0, 5));
    // }, [shouldFocus, filteredData])
    useEffect(() => {
        const filteredData = data.filter((item) =>
            item.course_name.toLowerCase().includes(searchValue?.toLowerCase())
        );
        setSearchResults(filteredData.slice(0, 5));
        setSelectedItem(-1); // Reset selected item on each search update
    }, [data]);

    useEffect(() => {
        inputRef.current.focus()
        setIsFocused(true);
    }, [shouldFocus])

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
        } else if (e.key === "Enter" && searchValue !== "") {
            // Navigate to the selected search result when Enter is pressed
            navigate(`/search/${searchValue}`);
            setIsFocused(false);
        }
    };

    const handleHover = (index) => {
        setSelectedItem(index);
    };


    const handleDocumentClick = (e) => {
        // Check if the click is outside the input and results
        if (
            inputRef.current &&
            !inputRef.current.contains(e.target) &&
            !e.target.classList.contains("search-result-item")
        ) {
            setIsFocused(false);
            setSelectedItem(-1);
        }
    };

    useEffect(() => {
        // Add click event listener to the document
        document.addEventListener("click", handleDocumentClick);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

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
                    ref={inputRef}
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
                        console.log('focuss')
                        setIsFocused(true);
                        const filteredData = data.filter((item) =>
                            item.course_name.toLowerCase().includes("")
                        );
                        setSearchResults(filteredData.slice(0, 5));
                        setSelectedItem(-1);
                        console.log(filteredData.slice(0, 5))
                    }}
                    onBlur={onBlur}
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
            {(isFocused || shouldFocus) && searchResults.length > 0 ? (
                <div className={`absolute w-72 top-16 bg-white border rounded-md p-2 z-40 ${shouldFocus ? "left-1/2 translate-x-[-50%] w-48" : ""}`}>
                    {searchResults.map((result, index) => (
                        <Link
                            to={`/search/${result.course_name}`}
                            className={`w-full block p-3 ${selectedItem === index ? "bg-gray-100" : ""
                                }`}
                            key={result.id}
                            onMouseEnter={() => handleHover(index)}
                            onClick={() => setSearchValue(result.course_name)}
                        >
                            {result.course_name}
                        </Link>
                    ))}
                </div>
            ) : ""}

            {/* Display matching results */}
            {(isFocused || shouldFocus) && searchResults.length === 0 && searchValue && (
                <div className="absolute w-72 top-16 bg-white border rounded-md p-2 z-40">
                    <p className="p-3">No matching result found</p>
                </div>
            )}
        </>
    );
};

export default SearchBar;
