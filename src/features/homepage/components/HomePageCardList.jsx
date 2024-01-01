import { CardPortrait } from "../../../components/HomePage/CardPortrait";
import HomePageFilter from "../../../components/HomePage/HomePageFilter";
import { useState, useEffect } from "react";
import axios from "axios";
import END_POINTS from "../../../constants/endpoints";

function HomePageCardList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(END_POINTS.COURSE);
        const coursesData = response.data;

        // Fetch creator names for each course
        const coursesWithNames = await Promise.all(
          coursesData.map(async (course) => {
            const creatorName = await fetchCreatorName(
              course.created_by_user_id
            );
            return { ...course, creatorName };
          })
        );

        setCourses(coursesWithNames);
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

        <CardPortrait
          showDetail={true}
          title="Python Course 2023 Beginner"
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
