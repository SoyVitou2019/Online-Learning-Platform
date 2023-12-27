import React, { useState, useEffect } from "react";
import axios from "axios";

const getUser = () => {
  const [userInfoRequest, setUserInfoRequest] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchUser = async () => {
      try {
        const response1 = await axios.get(
          "https://coding-fairy.com/api/mock-api-resources/ols/user_request"
        );

        const userMsgs = response1.data; // Assuming the API response is an array of user requests

        // Fetch user information for each user request
        const userPromises = userMsgs.map(async (item) => {
          const response2 = await axios.get(
            `https://coding-fairy.com/api/mock-api-resources/ols/user/${item.user_id}`
          );

          return {
            userId: item.user_id,
            userProfile: response2.data.profileUrl,
            fullName: response2.data.firstName + " " + response2.data.lastName,
            createdAt: response2.data.createAt.slice(0, 10),
            roleType: response2.data.roleType,
            message: item.request_msg,
          };
        });

        // Wait for all user information requests to complete
        const userInfoResults = await Promise.all(userPromises);

        // Update state with the combined user information
        setUserInfoRequest(userInfoResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchUser();
  }, []);

  return userInfoRequest;
};

export default getUser;
