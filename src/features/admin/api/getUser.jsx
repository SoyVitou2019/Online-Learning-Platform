import React, { useState, useEffect } from "react";



const getUser = () => {
  const [usersRequest, setUsersRequest] = useState([]);
  const [usermsgs, setUsermsg] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const userInfoRequest = {
    userId: null,
    userProfile: null,
    fullName: null,
    crateAt: null,
    roleType: null
  }
  useEffect(() => {
    fetch('https://coding-fairy.com/api/mock-api-resources/ols/user_request')
        .then((res) => res.json())
        .then((data) => {
            setUsermsg(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    
}, []);
  return usersRequest
}

export default getUser