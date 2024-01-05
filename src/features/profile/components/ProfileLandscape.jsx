import { useState, useEffect } from "react";
import axios from "axios";

const ProfileLandscape = ({ user_id }) => {
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
        <div className="flex items-center m-3">
            <img
                src="https://fakeimg.pl/60x60"
                alt="Profile Image"
                className="w-30 h-30 rounded-full mr-2"
            />
            <div className="pl-3">
                <h2 className="text-l font-semibold">
                    {user?.firstName + " " + user?.lastName}
                </h2>
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
    );
};

export default ProfileLandscape;
