import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
    const [events, setEvents] = useState();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const eventsResponse = await axios.get(
            "http://localhost:3000/api/get-all-events"
        );
        setEvents(eventsResponse.data);
    };

    return (
        <div>
            <h1>Events</h1>
            {events ? (
                <ul>
                    {events.map((event) => (
                        <li key={event._id}>{event._id}</li>
                    ))}
                </ul>
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
}
