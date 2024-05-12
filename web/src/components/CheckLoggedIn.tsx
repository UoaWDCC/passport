import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CheckLoggedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post("http://localhost:3000/api/user/check-user", { accessToken });
            if (response.data.success && accessToken !== null) {
              console.log("User is logged in");

            } else {
                if (location.pathname!== "/") {
                  localStorage.setItem('prevLocation', location.pathname);
                }
                navigate("/");
            }
          } catch (error) {
            console.error("Error fetching logged in data:", error);
            navigate("/");
          }
        };
        fetchUserData();
    }, []);;
    return <>{children}</>
}


export default CheckLoggedIn;