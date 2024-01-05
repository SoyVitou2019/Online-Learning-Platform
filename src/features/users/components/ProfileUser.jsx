import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/src/components/Spinner";
import END_POINTS from "@/src/constants/endpoints";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/api/Auth";
import { CardPortrait } from "@/src/components/Homepage/CardPortrait";

export const ViewProfile = () => {
  const { user } = useAuth();
  const { creator_id } = useParams();
  const [userData, setUserData] = useState({});
  const [userAllData, setUserAllData] = useState({});
  const [userCourse, setUserCourse] = useState([]);
  const [show_info, setShow_info] = useState("view_courses");
  const [userID, setUserID] = useState(null);
  const [isCheckUserFollow, setIsCheckUserFollow] = useState(false);
  const [userFollowData, setUserFollowData] = useState({});
  const [dependency, setDependency] = useState(false);
  const [follower, setFollower] = useState({
    followerId: [],
  });
  const [following, setFollowing] = useState({
    followingId: [],
  });

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
      fetchData();
      fetchUser();
      getFollower(userID);
      getFollowing(userID);
    }
  }, [userID, user, dependency]);

  const fetchData = async () => {
    try {
      const response = await axios.get(END_POINTS.FOLLOW);
      setUserFollowData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get(END_POINTS.USER + "/" + creator_id);
      const responseData = response.data;
      setUserData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getFollower = (user_id) => {
    user_id = parseInt(user_id);
    let userFollower = [];
    userFollowData?.userId?.map((item, idx) => {
      if (item === user_id) {
        userFollower.push(userFollowData.follower[idx]);
      }
    });
    setFollower({ followerId: userFollower });
  };

  const getFollowing = (user_id) => {
    user_id = parseInt(user_id);
    let userFollowing = [];
    userFollowData?.follower?.map((item, idx) => {
      if (item === user_id) {
        userFollowing.push(userFollowData.userId[idx]);
      }
    });
    setFollowing({ followingId: userFollowing });
  };

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

  const checkExitEncounter = () => {
    let localchange = false;
    if (Object.keys(userFollowData).length === 0) {
      return false;
    }
    userFollowData.userId.forEach((item, idx) => {
      if (
        item === parseInt(creator_id) &&
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
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axios.get(END_POINTS.USER);
        const responseData = response.data;
        setUserAllData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserCourse = async () => {
      try {
        const response = await axios.get(
          `${END_POINTS.COURSE}?created_by_user_id=${creator_id}&_limit=4`
        );
        const responseData = response.data;
        const coursesWithNames = await Promise.all(
          responseData.map(async (course) => {
            const creatorName = await fetchCreatorName(
              course.created_by_user_id
            );
            return { ...course, creatorName };
          })
        );
        setUserCourse(coursesWithNames);
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

    fetchUser();
    fetchUserCourse();
    fetchAllUser();
    fetchData();
    getFollower(creator_id);
    checkExitEncounter();
    getFollowing(creator_id);
  }, [creator_id, show_info, userID, dependency]);

  return (
    <div>
      <div className="bg-white border rounded-lg m-4 ">
        <div>
          <div className="bg-gray-200 h-32 flex items-end justify-end">
            <img src="https://en.idei.club/uploads/posts/2023-08/1691222816_en-idei-club-p-study-room-aesthetic-wallpaper-dizain-pint-61.jpg" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg> */}
          </div>
        </div>
        <a href="#" className="flex items-center ps-2.5 -mt-10 mx-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={userData.profileUrl} />
            <AvatarFallback>
              <Spinner />
            </AvatarFallback>
          </Avatar>
        </a>

        <div className="flex justify-end px-4 ">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg> */}
        </div>

        <div className="flex-col pb-4 py-2 px-8 ">
          <span className="text-2xl whitespace-nowrap dark:text-black font-bold">
            {userData.firstName + " " + userData.lastName}
          </span>
          <div className="flex gap-7">
            {userID !== parseInt(creator_id) ? (
              isCheckUserFollow ? (
                <button
                  onClick={() => {
                    unfollow(userID, creator_id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 flex gap-5 text-white font-bold py-2 px-4 rounded"
                >
                  <p>Unfollow</p>
                  <i className="bi bi-balloon-heart-fill"></i>
                </button>
              ) : (
                <button
                  onClick={() => {
                    follow(creator_id, userID);
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
          <hr className="mt-2" />
          <div className="flex gap-5">
            <h1 className="text-blue-500 text-md pt-4 mb-3">
              {follower.followerId.length} followers
            </h1>
            <h1 className="text-blue-500 text-md pt-4 mb-3">
              {following.followingId.length} followings
            </h1>
          </div>
          <div className="flex justify-between mb-2 w-64">
            <h1 className="text-black text-md">Role: {userData.role}</h1>
          </div>

          <div className="flex gap-8 justify-between pt-2 w-64">
            <Button className="py-1 bg-blue-500 hover:bg-blue-600">
              <h1
                onClick={() => {
                  setShow_info("view_courses");
                }}
                className="text-white"
              >
                View Courses
              </h1>
            </Button>
            <Button className="py-1 bg-blue-500 hover:bg-blue-600">
              <h1
                onClick={() => {
                  setShow_info("follower");
                }}
                className="text-white"
              >
                Follower
              </h1>
            </Button>
            <Button className="py-1 bg-blue-500 hover:bg-blue-600">
              <h1
                onClick={() => {
                  setShow_info("following");
                }}
                className="text-white"
              >
                Following
              </h1>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-lg m-4 ">
        <div className="flex-col px-6 py-4 ">
          {show_info === "view_courses" ? (
            <h1 className="font-bold text-xl mb-4">Courses created</h1>
          ) : show_info === "follower" ? (
            <h1 className="font-bold text-xl">Follower</h1>
          ) : (
            <h1 className="font-bold text-xl">Following</h1>
          )}
          <div className="">
            {show_info === "view_courses" ? (
              <div className="grid grid-cols-4 p-5 gap-4 bg-blue-50">
                {userCourse.map((course) => (
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
            ) : show_info === "follower" ? (
              <div className="grid grid-cols-2 mx-8 mt-10 md:grid-cols-6 md:gap-4">
                {follower.followerId.map((item, idx) => (
                  <div
                    key={idx}
                    className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={
                        userAllData.find((item2) => item2.id === item)
                          ?.profileUrl
                      }
                      alt="Profile Image"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 line-clamp-1">
                        {
                          userAllData.find((item2) => item2.id === item)
                            ?.firstName
                        }{" "}
                        {
                          userAllData.find((item2) => item2.id === item)
                            ?.lastName
                        }
                      </div>
                      <p className="text-gray-700 text-base">
                        {userAllData.find((item2) => item2.id === item)?.about}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 mx-8 mt-10 md:grid-cols-6 md:gap-4">
                {following.followingId.map((item, idx) => (
                  <div
                    key={idx}
                    className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={
                        userAllData.find((item2) => item2.id === item)
                          ?.profileUrl
                      }
                      alt="Profile Image"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2 line-clamp-1">
                        {
                          userAllData.find((item2) => item2.id === item)
                            ?.firstName
                        }{" "}
                        {
                          userAllData.find((item2) => item2.id === item)
                            ?.lastName
                        }
                      </div>
                      <p className="text-gray-700 text-base">
                        {userAllData.find((item2) => item2.id === item)?.about}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  return (
    <a href="#" className="flex items-center ps-2.5 mb-5">
      <i
        className="bi bi-person-circle w-20 text-6xl "
        style={{ color: "black" }}
      ></i>
      <div className="flex-col px-3 ">
        <span className="text-xl whitespace-nowrap dark:text-black font-bold">
          Eong Koungmeng
        </span>
        <div className="text-black text-xs">Followers: 15</div>
        <Button />
      </div>
    </a>
  );
};
