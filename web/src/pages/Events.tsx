import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page styles/event.css";
import logo from "../assets/primary_logo.svg";

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
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">Event Dashboard</h1>

            <div className="dashboard">
                <a href="/form" className="create-event-button">
                    Create new event
                </a>
                <div className="dashboard-header">
                    <div className="column">Name</div>
                    <div className="column">QR Code</div>
                    <div className="column">Stamp Image</div>
                    <div className="column">Status</div>
                    <div className="column"># of People Attended</div>
                    <div className="column">Edit/Delete</div>
                </div>
                {events ? (
                    <ul className="event-list">
                        {events.map((event) => (
                            <li key={event._id} className="event-item">
                                <div className="column">{event.eventName}</div>
                                <div className="column">
                                    <img
                                        src={event.QRcode}
                                        alt=""
                                        className="w-20"
                                    />
                                </div>

                                <div className="column">
                                    <img
                                        src={event.stamp64}
                                        alt=""
                                        className="w-20"
                                    />
                                </div>

                                <div className="column">{event.status}</div>
                                <div className="column">
                                    {Array.isArray(event.attendees)
                                        ? event.attendees.length
                                        : 0}
                                </div>
                                <div className="column">
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h1>Loading</h1>
                )}
            </div>
        </div>
    );
}
