import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CheckLoggedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const accessToken = localStorage.getItem('accessToken');
            console.log("Token: ", accessToken)
            const response = await axios.post("http://localhost:3000/api/user/check-user", { accessToken });
            if (response.data.success) {
              console.log("User is logged in");
            } else {
                navigate("/");
              // Make this so it returns to this page after logging in
            }
          } catch (error) {
            console.error("Error fetching logged in data:", error);
          }
        };
        fetchUserData();
    });
    return <>{children}</>
}


export default CheckLoggedIn;