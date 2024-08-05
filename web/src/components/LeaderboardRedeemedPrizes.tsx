import { useState, useEffect } from "react";

export default function GetRedeemedPrizes() {
  const [data, setData] = useState();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/user/redeemed-prizes/` +
            accessToken
        );
        if (!response.ok) {
          throw new Error("Error retrieving data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [accessToken]);
  return data;
}
