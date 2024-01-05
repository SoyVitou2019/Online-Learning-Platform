import { useParams } from "react-router-dom";
import axios from "axios";
import { CardLandscape } from "../../../components/HomePage/CardLandscape";
import END_POINTS from "../../../constants/endpoints";
import { useState, useEffect } from "react";
import SwitchCourse from "../../../components/SwitchCourse";
import CategoryFilter from "../components/CategoryFilter";
import SortBy from "../components/SortBy";
import { Spinner } from "../../../components/Spinner";

const SearchPage = () => {
    const { search_query } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [hasData, setHasData] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedSortBy, setSelectedSortBy] = useState("");
    const sortByList = ["Relevance", "Latest", "Oldest"];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(END_POINTS.CATEGORY);
                setAllCategories(response.data.map((cat) => cat.title)); // Assuming the endpoint returns an array of category names
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchCourses = async () => {
            try {
                let queryURL = END_POINTS.COURSE;
                if (selectedCategory !== "") {
                    queryURL += "?category=" + selectedCategory;

                    if (selectedSortBy !== "") {
                        if (selectedSortBy === "Relevance") {
                            queryURL += "&_sort=rank&_order=asc";
                        } else if (selectedSortBy === "Latest") {
                            queryURL += "&_sort=created_at&_order=desc";
                        } else {
                            queryURL += "&_sort=created_at&_order=asc";
                        }
                    }
                } else {
                    if (selectedSortBy !== "") {
                        if (selectedSortBy === "Relevance") {
                            queryURL += "?_sort=rank&order=asc";
                        } else if (selectedSortBy === "Latest") {
                            queryURL += "?_sort=created_at&_order=desc";
                        } else {
                            queryURL += "?_sort=created_at&_order=asc";
                        }
                    }
                }

                console.log(queryURL);
                const response = await axios.get(queryURL);
                const coursesData = response.data;
                const filteredData = coursesData.filter((item) =>
                    item.course_name.toLowerCase().includes(search_query?.toLowerCase())
                );

                if (filteredData.length === 0) {
                    setHasData(false);
                } else {
                    setHasData(true);
                }
                // Fetch creator names for each course
                const coursesWithNames = await Promise.all(
                    filteredData.map(async (course) => {
                        const creatorName = await fetchCreatorName(
                            course.created_by_user_id
                        );
                        return { ...course, creatorName };
                    })
                );

                setSearchResult(coursesWithNames);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchCreatorName = async (userID) => {
            try {
                const userResponse = await axios.get(`${END_POINTS.USER}/${userID}`);
                return userResponse.data.firstName + " " + userResponse.data.lastName; // Assuming the user endpoint returns the user details including the name
            } catch (error) {
                console.error("Error fetching creator name:", error);
                return "Unknown"; // Default to 'Unknown' if there's an error
            }
        };
        // Call the fetch function
        fetchCourses();
    }, [search_query, selectedCategory, selectedSortBy]); // Empty dependency array ensures that the effect runs only once (on mount)

    console.log(selectedSortBy);
    return (
        <div className="mb-14">
            <div className="flex justify-start gap-10 mx-5 mt-5">
                <div className="flex items-center bg-slate-200 rounded-lg">
                    <p className="text-lg mx-5">Category: </p>
                    <CategoryFilter
                        categories={allCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>
                <div className="flex items-center bg-slate-200 rounded-lg">
                    <p className="text-lg mx-5">Sort by: </p>

                    <SortBy
                        sortBy={selectedSortBy}
                        sortByList={sortByList}
                        onSortBy={setSelectedSortBy}
                    />
                </div>
            </div>
            <div className="flex justify-between text-2xl  mx-5 mt-3">
                <h1 className=" ">
                    {searchResult.length > 1
                        ? searchResult.length + " results"
                        : searchResult.length + " result"}
                </h1>
            </div>
            <hr className="mx-5 mt-2" />
            {isLoading && (
                <div className="flex justify-center h-[80vh] flex-col items-center">
                    <Spinner size="lg" />
                </div>
            )}
            <div className="grid grid-cols-1 p-5 gap-4">
                {searchResult?.map((course, index) => (
                    <CardLandscape
                        key={index}
                        showDetail={true}
                        course_name={course.course_name}
                        vid_id={course.vid_id}
                        course_description={course.couse_description}
                        created_by={course.creatorName}
                        creator_id={course.created_by_user_id}
                        created_at={course.created_at}
                        category={course.category}
                        rank={course.rank}
                        posts={course.posts}
                        course_expectation={course.course_expectation}
                        course_id={course.id}
                    />
                ))}
            </div>
            {!hasData ? <h1 className="ms-5">No courses in category</h1> : ""}
        </div>
    );
};
export default SearchPage;
