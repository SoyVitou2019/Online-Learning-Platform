import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProfileLandscape from "../components/ProfileLandscape";

export const FollowPage = ({ isFollowing }) => {
  let { id } = useParams();

  const [follows, setFollow] = useState({});

  useEffect(() => {
    // Function to fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://coding-fairy.com/api/mock-api-resources/ols/follow/" + id
        ); // Replace with your actual API endpoint
        setFollow(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchCourses();
  }, [id]); // Empty dependency array ensures that the effect runs only once (on mount)

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">
        {isFollowing === true
          ? follows?.following?.map((following) => (
              <ProfileLandscape key={following} user_id={following} />
            ))
          : follows?.follower?.map((follower) => (
              <ProfileLandscape key={follower} user_id={follower} />
            ))}

        <div className="flex items-center m-3">
          <img
            src="https://fakeimg.pl/60x60"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-3">
            <h2 className="text-l font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
            </div>
          </div>
          <a
            href="#"
            className="ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfollow
          </a>
        </div>

        <div className="flex items-center m-3">
          <img
            src="https://fakeimg.pl/60x60"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-3">
            <h2 className="text-l font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
            </div>
          </div>
          <a
            href="#"
            className="ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfollow
          </a>
        </div>

        <div className="flex items-center m-3">
          <img
            src="https://fakeimg.pl/60x60"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-3">
            <h2 className="text-l font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
            </div>
          </div>
          <a
            href="#"
            className="ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfollow
          </a>
        </div>
      </div>
    </>
  );
};
