import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckLoggedInAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const upi = localStorage.getItem("userUpi");
        const accessToken = localStorage.getItem("accessToken");
        if (!upi || !accessToken) {
          navigate("/dashboard/not-an-admin");
          setIsLoading(false);
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/check-user`,
          { accessToken }
        );
        const userData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/${upi}`);
        // Check that the user is logged in, the upi and accessToken match in the db, and that the user is an admin
        if (response.data.success && userData.data.isAdmin && accessToken === userData.data.accessToken) {
          console.log("User is an admin");
          setIsLoggedIn(true);
        } else {
          console.log("User is not an admin");
          navigate("/dashboard/not-an-admin");
          }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/dashboard/not-an-admin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return isLoading ? null : isLoggedIn ? <>{children}</> : null;
};

export default CheckLoggedInAdmin;
