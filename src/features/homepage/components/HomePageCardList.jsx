import { CardPortrait } from "../../../components/HomePage/CardPortrait";
import HomePageFilter from "../../../components/HomePage/HomePageFilter";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePageCardList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchPopularCourses = async () => {
      try {
        const response = await axios.get(
          "https://coding-fairy.com/api/mock-api-resources/ols/popular_courses"
        ); // Replace with your actual API endpoint
        setCourses(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchPopularCourses();
  }, []); // Empty dependency array ensures that the effect runs only once (on mount)

  return (
    <>
      <HomePageFilter />
      <h1 className=" text-2xl font-bold m-2">Popular</h1>
      <hr />
      <div className="grid grid-cols-4 p-5 gap-4">
        {courses.map((course) => (
          <CardPortrait
            key={course.id}
            showDetail={true}
            title={course.course_name}
            desc={course.couse_description}
            author={course.created_by}
            category={course.category_id}
          />
        ))}

        <CardPortrait
          showDetail={true}
          title="Hellasdfasdfasdfasdfasdf"
          desc="hello my name is koungmeng, my name is koungmenghello my name is koungmeng, my name is koungmenghello my name is koungmeng, my name is koungmeng"
          author="koungmeng"
          category={"helllo"}
        />
      </div>
      <h1 className=" text-2xl font-bold m-2">News</h1>
      <hr />
      <div className="grid grid-cols-3 p-5 gap-4">
        <CardPortrait />
        <CardPortrait />
        <CardPortrait />
        <CardPortrait />
        <CardPortrait />
        <CardPortrait />
      </div>
    </>
  );
}
export default HomePageCardList;
