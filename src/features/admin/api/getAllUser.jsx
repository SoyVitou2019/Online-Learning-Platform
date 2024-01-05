import { useState, useEffect } from "react";
import axios from "axios";

// const getAllUser = () => {

// Function to fetch data from the API
const fetchAllUser = async () => {
  const [userInfoRequest, setUserInfoRequest] = useState([]);
  try {
    const response1 = await axios.get(
      "https://coding-fairy.com/api/mock-api-resources/ols/user"
    );

    const userMsgs = response1.data; // Assuming the API response is an array of user requests
    // Fetch user information for each user request
    const userPromises = userMsgs.map(async (item) => {
      return {
        userId: item.id,
        userProfile: item.profileUrl,
        fullName: item.firstName + " " + item.lastName,
        createdAt: item.createAt.slice(0, 10),
        roleType: item.roleType
      };
    });

    // Wait for all user information requests to complete
    const userInfoResults = await Promise.all(userPromises);

    // Update state with the combined user information
    setUserInfoRequest(userInfoResults);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return userInfoRequest;
};

// Call the fetch function



export default fetchAllUser;
