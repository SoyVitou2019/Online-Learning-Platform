import { CardPortrait } from "../../../components/HomePage/CardPortrait";
import HomePageFilter from "../../../components/HomePage/HomePageFilter";
import { useState, useEffect } from "react";
import axios from "axios";
import END_POINTS from "../../../constants/endpoints";
import { Spinner } from "../../../components/Spinner";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/api/Auth";

function HomePageFollow() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [userFollowData, setUserFollowData] = useState({});

  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${END_POINTS.COURSE}?_sort=created_at`
        );

        const courseData = response.data;

        const coursesWithNames = await Promise.all(
          courseData.map(async (course) => {
            const creatorName = await fetchCreatorName(
              course.created_by_user_id
            );
            return { ...course, creatorName };
          })
        );

        setCourses(followingCourseFilter(coursesWithNames, userID));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCreatorName = async (userID) => {
      try {
        const userResponse = await axios.get(`${END_POINTS.USER}/${userID}`);
        return userResponse.data.firstName + " " + userResponse.data.lastName;
      } catch (error) {
        console.error("Error fetching creator name:", error);
        return "Unknown";
      }
    };

    fetchCourses();
  }, [userID]);

  console.log(courses);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(END_POINTS.USER + "?uid=" + user.id);
        const responseData = response.data;
        const res = await axios.get(END_POINTS.FOLLOW);
        setUserFollowData(res.data[0]);
        setUserID(responseData[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [userID]);

  const getFollowing = (user_id) => {
    user_id = parseInt(user_id);
    let userFollowing = [];
    userFollowData?.follower?.map((item, idx) => {
      if (item === user_id) {
        userFollowing.push(userFollowData.userId[idx]);
      }
    });

    return userFollowing;
  };

  const followingCourseFilter = (coursef, uid) => {
    const foll = getFollowing(uid);
    const filterd = coursef.filter((course) => {
      return foll.includes(parseInt(course.created_by_user_id));
    });

    return filterd;
  };

  return (
    <div className="mb-14">
      <div className="flex justify-between mx-5 mt-3">
        <h1 className=" text-2xl font-bold">Popular courses</h1>
        <Link to="/home">
          <button
            className={
              "px-3 py-2  rounded-2xl text-gray-800 font-semibold border-2 border-gray-500 "
            }
          >
            All
          </button>
        </Link>
      </div>
      <hr className="mx-5 mt-2" />
      {isLoading && (
        <div className="flex justify-center h-[80vh] flex-col items-center">
          <Spinner size="lg" />
        </div>
      )}

      <div className="grid grid-cols-4 p-5 gap-4 bg-blue-50">
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
      </div>
    </div>
  );
}

export default HomePageFollow;
