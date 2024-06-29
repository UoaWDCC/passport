import axios from "axios";
import { useEffect, useState } from "react";

export default function StampCount() {
    const [totalStamps, setTotalStamps] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async (upi: string) => {
            try {
                const res = await axios.get(import.meta.env.VITE_SERVER_URL + "/api/user/" + upi);
                setTotalStamps(res.data.totalStamps);
            } catch (error) {
                console.error('There was an error making the GET request:', error);
            }
        };

        const userUPI = localStorage.getItem("userUpi");

        if (userUPI) {
            fetchData(userUPI);
        } else {
            console.error('userUPI is null');
        }
        
    }, []);

    return (
        <div>
            <div className="border-b-4 welcome-line w-88 mb-1 mt-3"></div>
            <div className=" text-center text-blue-950 ">  <span className="text-4xl font-semibold">{totalStamps} </span> <span className="text-xl">Stamps Collected</span></div>
            <div className="border-b-4 welcome-line w-88 mb-4 mt-1"></div>
        </div>
    );
}


