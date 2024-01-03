import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProfileLandscape from "../components/ProfileLandscape";

export const FollowPage = () => {
  // let { id } = useParams();
  const [userFollowData, setUserFollowData] = useState({
    id: [],
    userId: [],
    follower: [],
  });
  const [follower, setFollower] = useState({
    followerId: [],
  });
  const [following, setFollowing] = useState({
    followingId: [],
  });
  const [isFollowing, setIsFollowing] = useState(false);

  const getFollower = (user_id) => {
    let userFollower = [];
    userFollowData.userId.map((item, idx) => {
      if (item === user_id) {
        userFollower.push(userFollowData.follower[idx]);
      }
    });
    setFollower({ followerId: userFollower });
  };

  const getFollowing = (user_id) => {
    let userFollowing = [];
    userFollowData.follower.map((item, idx) => {
      if (item === user_id) {
        userFollowing.push(userFollowData.userId[idx]);
      }
    });
    setFollowing({ followingId: userFollowing });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(END_POINTS.FOLLOW);
      const userFollow = response.data[0];
      setUserFollowData(userFollow);
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
      console.log(userFollowData);
      const response = await axios.put(
        END_POINTS.FOLLOW + "/1",
        userFollowData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error remove follower:", error);
    }
  }

  async function unfollow(removeId, userId) {
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
      console.log(userFollowData);
      const response = await axios.put(
        END_POINTS.FOLLOW + "/1",
        userFollowData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error remove follower:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getFollower(1);
    getFollowing(1);
  }, [userFollowData]);

  return (
    <>
      <div className="pl-5 flex justify-start border-t border-b border-gray-300">
        <a href="#" className=" p-4 py-2 text-md font-medium text-center">
          Follower
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Following
        </a>
      </div>

      {isFollowing ? (
        <div className="grid grid-cols-2 mx-8 mt-10 md:grid-cols-6 md:gap-4">
          {following.followingId.map((item, idx) => (
            <div
              key={idx}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <img
                className="w-full h-48 object-cover"
                src="https://fakeimg.pl/60x60"
                alt="Profile Image"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 line-clamp-1">
                  Username {item}
                </div>
                <p className="text-gray-700 text-base">
                  Description or bio goes here...
                </p>
              </div>
              <div className="px-6 py-4">
                <button
                  onClick={() => {
                    unfollow(item, 1);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Unfollow
                </button>
              </img>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 mx-8 mt-10 md:grid-cols-6 md:gap-4">
          {follower.followerId.map((item, idx) => (
            <div
              key={idx}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
            >
              <img
                className="w-full h-48 object-cover"
                src="https://fakeimg.pl/60x60"
                alt="Profile Image"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 line-clamp-1">
                  Username {item}
                </div>
                <p className="text-gray-700 text-base">
                  Description or bio goes here...
                </p>
              </div>
              <div className="px-6 py-4">
                <button
                  onClick={() => {
                    removeFollower(item, 1);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
