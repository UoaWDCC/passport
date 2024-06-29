import axios from "axios";
import { useEffect, useState } from "react";

export default function WelcomeMessage() {
    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async (upi: string) => {
            try {
                const res = await axios.get(import.meta.env.VITE_SERVER_URL + "/api/user/" + upi);
                setFirstName(res.data.firstName);
            } catch (error) {
                console.error('There was an error making the GET request:', error);
                // Handle error state or rethrow if necessary
            }
        };

        const userUPI = localStorage.getItem("userUpi");

        if (userUPI) {
            fetchData(userUPI);
        } else {
            console.error('userUPI is null');
            // Handle the null case, e.g., redirect to login, show an error message, etc.
        }
    }, []);

    return (
    <div className="pt-3 text-left flex item-start">
        <h1 className="text-2xl text-blue-950"><span className="italic">Welcome</span> <span className="font-semibold">{firstName}</span></h1>
    </div>
    );
}
