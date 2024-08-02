import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page styles/event.css";
import logo from "../assets/primary_logo.svg";
import HamburgerMenu from "@components/HamburgerMenuAdmin";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@components/DeleteModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    getEvents();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (selectedEventId) {
      try {
        // Perform the delete request
        await axios.delete(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/delete-event/${selectedEventId}`
        );
        // Refresh events list
        getEvents();
        console.log("Item deleted");
      } catch (error) {
        console.error("Error deleting event:", error);
      }
      setIsModalOpen(false);
      setSelectedEventId(null);
    }
  };

  const getEvents = async () => {
    try {
      const eventsResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/get-all-events`
      );
      setEvents(eventsResponse.data);
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
        {events.length > 0 ? (
          <ul className="event-list">
            {events.map((event: Event) => (
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
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate(`/form/${event._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setSelectedEventId(event._id);
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h1>Loading</h1>
        )}
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
