import { useEffect, useState } from 'react';

const GetLeaderboardStats = () => {
    const [data, setData] = useState({
        accessToken : "null",
        email : "null",
        eventList: [],
        firstName : "null",
        lastName : "null", 
        totalStamps : 0,
        upi : "null",
        __v : 0,
        _id : "0"

    });

    const upi = localStorage.getItem('userUpi');

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/` + upi);
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const result = await response.json();
        setData(result);
        } catch (error) {
        console.error('Error fetching data');
        }
    };

    fetchData();
    }, [upi]);
    return data;
};

export default GetLeaderboardStats;