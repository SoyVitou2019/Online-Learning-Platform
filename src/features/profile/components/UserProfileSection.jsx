import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const UserProfileSection = ({ user_id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Function to fetch data from the API
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://coding-fairy.com/api/mock-api-resources/ols/user/" + user_id
        ); // Replace with your actual API endpoint
        setUser(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchProfile();
  }, [user_id]); // Empty dependency array ensures that the effect runs only once (on mount)

  return (
    <div className="h-screen">
      <div className="relative">
        <img
          src="https://fakeimg.pl/1600x900"
          alt="Banner Image"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="flex items-center justify-between pl-8 text-black">
        <div className="flex items-center">
          <img
            src="https://fakeimg.pl/100x100"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-5">
            <h3 className="text-xl">{user.roleType}</h3>
            <h2 className="text-xl font-semibold">
              {user.firstName + " " + user.lastName}
            </h2>
            <div className="flex justify-start">
              <a
                href="#"
                className=" mr-2 py-2 text-sm font-medium text-center"
              >
                Follower: 2
              </a>
              <a href="#" className="ml-auto py-2 text-sm font-medium ">
                Following: 4
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-5 flex justify-start border-t border-b border-gray-300">
        <a href="#" className=" p-4 py-2 text-md font-medium text-center">
          About
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Follow
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Contact
        </a>
      </div>

      <div className="bg-gray-400 pl-9">
        <p>Joined 19th July 2023</p>
        <p>I am Koungmeng. I love Anime and Video games. Thanks</p>
        <p>Education: </p>
        <ul>
          <li>Hello</li>
          <li>My name</li>
        </ul>
      </div>
    </div>
  );
};
