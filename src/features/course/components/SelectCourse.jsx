import { CardPortrait } from "../../../components/HomePage/CardPortrait";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { VideoList } from "./VideoList";
import END_POINTS from "../../../constants/endpoints";
import BackButton from "../../../components/BackButton";
import { useAuth } from "../../auth/api/Auth";
import { Link } from "react-router-dom";

export const SelectCourse = ({ course_id }) => {
  const { user } = useAuth();
  const [course, setCourse] = useState({});
  const [courseByTeacher, setCourseByTeacher] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [userID, setUserID] = useState(null);
  const [userFollowData, setUserFollowData] = useState({});
  const [dependency, setDependency] = useState(false);
  const [isCheckUserFollow, setIsCheckUserFollow] = useState(false);
  const [follower, setFollower] = useState({

    followerId: [],
  });

  const checkExitEncounter = () => {
    let localchange = false;
    if (Object.keys(userFollowData).length === 0) {
      return false;
    }
    userFollowData.userId.forEach((item, idx) => {
      if (
        item === parseInt(teacher.id) &&
        userID === userFollowData.follower[idx]
      ) {
        setIsCheckUserFollow(true);
        localchange = true;
        return false;
      }
    });
    if (localchange) {
      return false;
    }
    setIsCheckUserFollow(false);

    return true;
  };
  async function follow(IDUWant, selfID) {
    selfID = parseInt(selfID);
    IDUWant = parseInt(IDUWant);
    // fetch user every update server
    const checkExitEncounter = () => {
      for (let idx = 0; idx < userFollowData.userId.length; idx++) {
        const item = userFollowData.userId[idx];
        if (item === IDUWant && selfID === userFollowData.follower[idx]) {
          return true;
        }
      }
      return false;
    };
    let isntExit = checkExitEncounter();
    try {
      let updateUserId = userFollowData.userId;
      let updatedFollower = userFollowData.follower;
      for (let idx = 0; idx < userFollowData.userId.length; idx++) {
        const item = userFollowData.userId[idx];

        if ((item === IDUWant) & !isntExit) {
          updateUserId.splice(idx + 1, 0, IDUWant);
          updatedFollower.splice(idx + 1, 0, selfID);
          break;
        }
      }
      setUserFollowData({
        userId: updateUserId,
        follower: updatedFollower,
      });

      setDependency(true);
      await axios.put(END_POINTS.FOLLOW + "/1", userFollowData);
    } catch (e) {
      console.error("Error remove following:", e);
    }
  }
  async function unfollow(removeId, userId) {
    userId = parseInt(userId);
    try {
      let updateUserId = userFollowData.userId;
      let updatedFollower = userFollowData.follower;
      userFollowData.follower.map((item, idx) => {
        if (item === removeId && userFollowData.userId[idx] === userId) {
          updateUserId.splice(idx, 1);
          updatedFollower.splice(idx, 1);
        }
      });

      setUserFollowData({
        userId: updateUserId,
        follower: updatedFollower,
      });
      setDependency(3);
      await axios.put(END_POINTS.FOLLOW + "/1", userFollowData);
    } catch (error) {
      console.error("Error remove follower:", error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(END_POINTS.USER + "?uid=" + user.id);
        const userData = response.data;
        setUserID(userData[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user.id !== null) {
      fetchData()
      fetchUser();
      getFollower(teacher.id);
      checkExitEncounter()
    }
  }, [userID, user, dependency]);

  const getFollower = (user_id) => {
    user_id = parseInt(user_id);
    let userFollower = [];
    userFollowData?.userId?.map((item, idx) => {
      if (item === user_id) {
        userFollower.push(userFollowData.follower[idx]);
      }
    });
    setDependency(2)
    setFollower({ followerId: userFollower });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(END_POINTS.FOLLOW);
      setUserFollowData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Function to fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(END_POINTS.COURSE + "/" + course_id); // Replace with your actual API endpoint
        setCourse(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchCourses();
  }, [course_id]); // Empty dependency array ensures that the effect runs only once (on mount)

  useEffect(() => {
    // Function to fetch post details for each post_id in the course
    const fetchPostDetails = async () => {
      try {
        // Assuming course.posts is the array of post_ids in your course object
        const promises = course.posts.map(async (post_id) => {
          const response = await axios.get(`${END_POINTS.POST}/${post_id}`);
          return response.data;
        });

        // Wait for all promises to resolve
        const postDetailsData = await Promise.all(promises);

        // Set the post details in state
        setPostDetails(postDetailsData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    // Check if course.posts is available and call fetchPostDetails
    if (course.posts && course.posts.length > 0) {
      fetchPostDetails();
    }
  }, [course.posts]);

  useEffect(() => {
    // Function to fetch teacher details
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(
          `${END_POINTS.USER}/${course.created_by_user_id}`
        );
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          END_POINTS.COURSE + "?created_by_user_id=" + course.created_by_user_id
        );
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

        setCourseByTeacher(coursesWithNames);
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

    // Check if course.creator_id is available and call fetchTeacherDetails
    if (course.created_by_user_id) {
      fetchTeacherDetails();
      fetchCourses();
    }
  }, [course.created_by_user_id]);

  return (
    <section className="bg-blue-50">
      <div className="flex">

        {/* left side */}
        <div className="ml-10 w-2/3 overflow-y-scroll max-h-screen">
          <h1 className="font-semibold flex gap-2 text-3xl my-3 ">
            <BackButton />
            {course.course_name}
          </h1>
          <div>
            <p>{course.couse_description}</p>
          </div>
          <div className=" mt-9  pb-3 bg-blue-100">
            <div className="px-3">
              <p className=" text-xl">What you will learn</p>
              <div className="grid grid-flow-col h-auto gap-8 mt-4 bg-white p-5">
                <div className="flex flex-col justify-around gap-8">
                  {course.course_expectation?.map((expectation, index) => (
                    <p key={index}> {"✅ " + expectation}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 pb-3 bg-blue-100">
            <div className="px-3">
              <p className="text-xl">Course Content</p>
              <div className="grid grid-flow-row gap-4 mt-4">
                {/* Item1 */}
                {postDetails.map((post, index) => (
                  <VideoList
                    key={post.id}
                    post_id={post.id}
                    course_id={course_id}
                    index={index}
                    title={post.title}
                    vid_id={post.vid_id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="px-3 bg-gray-50 w-1/3">
          <p className="text-2xl font-bold px-2">About Creator</p>

          <div className="mt-10 ml-4 flex">
            <Link
              to={"/profile/" + teacher.id}
              className="flex items-center ps-2.5 mb-5"
            >
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={teacher.profileUrl}
                alt="Description of the image"
              />
              <div className="flex-col px-3 ">
                <span className="text-xl whitespace-nowrap dark:text-black font-bold">
                  {teacher.firstName + " " + teacher.lastName}
                </span>
                <div className="text-black text-xs">Followers: {follower.followerId.length}</div>
              </div>
            </Link>
            <div className="flex flex-col ml-10 justify-center">
              {userID !== parseInt(teacher.id) ? (
                isCheckUserFollow ? (
                  <button
                    onClick={() => {
                      unfollow(userID, teacher.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 py-4 flex gap-5 text-white font-bold px-4 rounded"
                  >
                    <p>Unfollow</p>
                    <i className="bi bi-balloon-heart-fill"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      follow(teacher.id, userID);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 py-4 flex gap-5 text-white font-bold px-4 rounded"
                  >
                    <p>Follow</p>
                    <i className="bi bi-balloon-heart"></i>
                  </button>
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="ml-3">
            <ul className="mt-2">{teacher.about}</ul>
          </div>
          <div className=" font-bold mt-5 ml-3">
            Other Courses by {teacher.firstName + " " + teacher.lastName}
          </div>
          <div className=" mx-4 mt-4">
            {courseByTeacher.slice(0, 1).map((c) => (
              <div key={c.id} className="mb-2">
                <CardPortrait
                  showDetail={true}
                  course_name={c.course_name}
                  vid_id={c.vid_id}
                  course_description={c.couse_description}
                  created_by={c.creatorName}
                  creator_id={c.created_by_user_id}
                  created_at={c.created_at}
                  category={c.category}
                  rank={c.rank}
                  posts={c.posts}
                  course_expectation={c.course_expectation}
                  course_id={c.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
