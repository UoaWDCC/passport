import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page styles/event.css";
import logo from "../assets/primary_logo.svg";
import HamburgerMenu from "@components/HamburgerMenuAdmin";

interface Event {
  _id: string;
  eventName: string;
  QRcode: string;
  stamp64: string;
  status: boolean;
  totalAttended: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsToShow, setEventsToShow] = useState(10);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const eventsResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/get-all-events`
      );
      const activeEvents = eventsResponse.data.filter(
        (event: Event) => event.status
      );
      const inactiveEvents = eventsResponse.data.filter(
        (event: Event) => !event.status
      );
      const combinedEvents = inactiveEvents.concat(activeEvents).reverse();
      setEvents(combinedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="text-gray-800">
      <HamburgerMenu />
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
            {events.slice(0, eventsToShow).map((event: Event) => (
              <li key={event._id} className="event-item">
                <div className="column">{event.eventName}</div>
                <div className="column">
                  <img src={event.QRcode} alt="" className="w-20 mx-auto" />
                </div>

                <div className="column">
                  <img src={event.stamp64} alt="" className="w-20 mx-auto" />
                </div>

                <div className="column">
                  {event.status ? <p>Active</p> : <p>Inactive</p>}
                </div>

                <div className="column">{event.totalAttended}</div>

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {eventsToShow < events.length && (
            <button className="load-more-button" onClick={() => setEventsToShow(10 + eventsToShow)}>
              LOAD MORE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
