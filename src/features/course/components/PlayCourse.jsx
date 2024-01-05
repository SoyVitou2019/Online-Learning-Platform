import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { VideoList } from "./VideoList";
import END_POINTS from "../../../constants/endpoints";
import { youtubeKey } from "../../auth/api/client";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/api/Auth";

const PlayCourse = () => {
  const { course_id } = useParams();
  const { index } = useParams();

  const [course, setCourse] = useState({});
  const [postDetails, setPostDetails] = useState([]);
  const [videoDetails, setVideoDetails] = useState(null);
  const [teacher, setTeacher] = useState({});

  const { user } = useAuth();
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
        const res = await axios.get(
          `${END_POINTS.USER}/${response.data.created_by_user_id}`
        );
        setTeacher(res.data);
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
    const fetchDesc = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${postDetails[index]?.vid_id}&key=${youtubeKey}`
        );

        if (response.data.items.length > 0) {
          setVideoDetails(response.data.items[0].snippet);
        } else {
          console.error("No video details found.");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };
    if (course.posts && course.posts.length > 0) {
      fetchDesc();
    }
  }, [postDetails, dependency]);

  return (
    <section>
      <section className="mx-3 bg-blue-50">

        <div className="flex h-[90vh]">
          {/* left side */}
          <div onClick={()=>{setDependency(5)}} className=" bg-white h-full w-[45%] overflow-y-scroll ms-3">
            <div className="mx-2 py-2 flex flex-col gap-2  ">
              <p className=" font-bold text-xl line-clamp-1">{course.course_name}</p>
              <p>Content Here</p>
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

          {/* right side */}
          <div className="w-full">
            {/* frame */}
            <div className="px-10">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${postDetails[index]?.vid_id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className=" mt-4">
                <p className=" font-bold text-xl">
                  {postDetails.length > 0 ? postDetails[index].title : ""}
                </p>
              </div>
              <p className="mt-2 line-clamp-2">{videoDetails?.description}</p>
            </div>
            <div className="mt-3 mb-14 flex py-4 ml-10 mr-10 bg-slate-200 ">
              <Link
                to={"/profile/" + teacher.id}
                className="flex items-center ml-10 justify-start mr-8"
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
              <div className="flex flex-col justify-center">
                {userID !== parseInt(teacher.id) ? (
                  isCheckUserFollow ? (
                    <button
                      onClick={() => {
                        unfollow(userID, teacher.id);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 flex gap-5 text-white font-bold py-2 px-4 rounded"
                    >
                      <p>Unfollow</p>
                      <i className="bi bi-balloon-heart-fill"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        follow(teacher.id, userID);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 flex gap-5 text-white font-bold py-2 px-4 rounded"
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
          </div>
        </div>
      </section>
    </section>
  );
};

export default PlayCourse;
