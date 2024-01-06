import axios from "axios";
import { useEffect, useState } from "react";
import END_POINTS from "../../../constants/endpoints";
import { useAuth } from "../../auth/api/Auth";
import { Link } from "react-router-dom";

// import ProfileLandscape from "../components/ProfileLandscape";

export const FollowPage = () => {
  const { user } = useAuth();
  const [userFollowData, setUserFollowData] = useState({});
  const [userID, setUserID] = useState(null);
  const [userAllData, setUserAllData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
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
      fetchAllUser();
      getFollower(userID);
      getFollowing(userID);
    }
  }, [userID, user, isFollowing]);

  console.log(userAllData);
  const [follower, setFollower] = useState({
    followerId: [],
  });
  const [following, setFollowing] = useState({
    followingId: [],
  });

  const getFollower = (user_id) => {
    let userFollower = [];
    userFollowData?.userId?.map((item, idx) => {
      if (item === user_id) {
        userFollower.push(userFollowData.follower[idx]);
      }
    });
    setFollower({ followerId: userFollower });
  };
  const fetchAllUser = async () => {
    try {
      const response = await axios.get(END_POINTS.USER);
      const responseData = response.data;
      setUserAllData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFollowing = (user_id) => {
    let userFollowing = [];
    userFollowData?.follower?.map((item, idx) => {
      if (item === user_id) {
        userFollowing.push(userFollowData.userId[idx]);
      }
    });
    setFollowing({ followingId: userFollowing });
  };
  const fetchData = async () => {
    try {
      axios.get(END_POINTS.FOLLOW).then((response) => {
        const arr = response.data[0];
        setUserFollowData(arr);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function removeFollower(removeId, userId) {
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
      await axios.put(END_POINTS.FOLLOW + "/1", userFollowData);
    } catch (error) {
      console.error("Error remove follower:", error);
    }
  }

  async function follow(IDUWant, selfID) {
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

      await axios.put(END_POINTS.FOLLOW + "/1", userFollowData);
    } catch (e) {
      console.error("Error remove following:", e);
    }
    fetchData();
    fetchAllUser();
    getFollower(userID);
    getFollowing(userID);
  }

  async function unfollow(removeId, userId) {
    // fetch user every update server

    try {
      let updateUserId = userFollowData.userId;
      let updatedFollower = userFollowData.follower;
      userFollowData.follower.map((item, idx) => {
        if (item === userId && userFollowData.userId[idx] === removeId) {
          updateUserId.splice(idx, 1);
          updatedFollower.splice(idx, 1);
        }
      });

      setUserFollowData({
        userId: updateUserId,
        follower: updatedFollower,
      });

      await axios.put(END_POINTS.FOLLOW + "/1", userFollowData);
    } catch (e) {
      console.error("Error remove following:", e);
    }
    fetchData();
    fetchAllUser();
    getFollower(userID);
    getFollowing(userID);
  }

  return (
    <>
      <div className="pl-5 flex py-3 gap-10 justify-start border-t border-b border-gray-300">
        <button
          onClick={() => setIsFollowing(false)}
          className={
            !isFollowing
              ? "bg-lime-700 hover:bg-lime-600 text-white px-4 py-2 rounded-lg"
              : "px-4 py-2"
          }
        >
          Follower
        </button>
        <button
          onClick={() => setIsFollowing(true)}
          className={
            isFollowing
              ? "bg-lime-700 hover:bg-lime-600 text-white px-4 py-2 rounded-lg"
              : "px-4 py-2"
          }
        >
          Following
        </button>
      </div>

      {isFollowing ? (
        <div className="grid grid-cols-2 mx-8 mt-10 md:grid-cols-6 md:gap-4">
          {following.followingId.map((item, idx) => (
            <Link key={idx} to={"/profile/" + item}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover"
                  src={
                    userAllData.find((item2) => item2.id === item)?.profileUrl
                  }
                  alt="Profile Image"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 line-clamp-1">
                    {userAllData.find((item2) => item2.id === item)?.firstName}{" "}
                    {userAllData.find((item2) => item2.id === item)?.lastName}
                  </div>
                  <p className="text-gray-700 text-base">
                    {userAllData.find((item2) => item2.id === item)?.about}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <button
                    onClick={() => {
                      unfollow(item, userID);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 mx-8 mt-10 md:grid-cols-6 md:gap-4">
          {follower.followerId.map((item, idx) => (
            <Link key={idx} to={"/profile/" + item}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img
                  className="w-full h-48 object-cover"
                  src={
                    userAllData.find((item2) => item2.id === item)?.profileUrl
                  }
                  alt="Profile Image"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 line-clamp-1">
                    {userAllData.find((item2) => item2.id === item)?.firstName}{" "}
                    {userAllData.find((item2) => item2.id === item)?.lastName}
                  </div>
                  <p className="text-gray-700 text-base">
                    {userAllData.find((item2) => item2.id === item)?.about}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <button
                    onClick={() => {
                      removeFollower(item, userID);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
