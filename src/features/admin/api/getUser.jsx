import React, { useState, useEffect } from "react";



const getUser = () => {
  const [usersRequest, setUsersRequest] = useState([]);
  useEffect(() => {
    fetch('https://coding-fairy.com/api/mock-api-resources/ols/user_request')
        .then((res) => res.json())
        .then((data) => {
            setUsersRequest(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}, []);
  return usersRequest
}

export default getUser