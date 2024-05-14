import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const CheckLoggedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/check-user`, { accessToken });
        if (response.data.success && accessToken) {
          console.log("User is logged in");
          setIsLoggedIn(true);
        } else {
           if (location.pathname!== "/sign-in") {
                  localStorage.setItem('prevLocation', location.pathname);
            }
          console.log("User is not logged in");
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Error fetching logged-in data:", error);
        navigate("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return isLoading ? null : isLoggedIn ? <>{children}</> : null;
}

export default CheckLoggedIn;
