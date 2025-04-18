import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/page styles/event.css";
import logo from "../assets/primary_logo.svg";
import HamburgerMenu from "@components/HamburgerMenuAdmin";
import SearchBar from "@components/SearchBar";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@components/DeleteModal";
import ErrorPage from "@pages/MobileErrorPage";
import CheckLoggedInAdmin from "@components/CheckLoggedInAdmin";
import Spinner from "@components/spinner";

interface Event {
  _id: string;
  eventName: string;
  QRcode: string;
  stamp64: string;
  eventVenue: string;
  eventDescription: string;
  status: boolean;
  totalAttended: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventsToShow, setEventsToShow] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [noMatches, setNoMatches] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("delted entered");
    if (selectedEventId) {
      try {
        // Perform the delete request
        await axios.delete(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/event/delete-event/${selectedEventId}`
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
        `${import.meta.env.VITE_SERVER_URL}/api/event/get-all-events`
      );
      setEvents(eventsResponse.data);
      const activeEvents = eventsResponse.data.filter(
        (event: Event) => event.status
      );
      const inactiveEvents = eventsResponse.data.filter(
        (event: Event) => !event.status
      );
      const combinedEvents = inactiveEvents.concat(activeEvents).reverse();
      setEvents(combinedEvents);
      setDisplayedEvents(combinedEvents.slice(0, eventsToShow));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = events.filter((event) =>
        event.eventName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
      setDisplayedEvents(filtered.slice(0, eventsToShow));
      setNoMatches(filtered.length === 0);
    } else {
      setFilteredEvents([]);
      setDisplayedEvents(events.slice(0, eventsToShow));
      setNoMatches(false);
    }
  };

  const loadMoreEvents = () => {
    const moreEvents = searchQuery
      ? filteredEvents.slice(0, eventsToShow + 10)
      : events.slice(0, eventsToShow + 10);
    setEventsToShow(eventsToShow + 10);
    setDisplayedEvents(moreEvents);
  };

  if (isMobile) {
    return <ErrorPage />;
  }

  return (
    <CheckLoggedInAdmin>
      <div className="text-gray-800">
        <HamburgerMenu />
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Events Dashboard</h1>

        <div className="dashboard">
          <a href="/form" className="create-event-button font-semibold">
            Create New Event
          </a>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            noMatches={noMatches}
          />

          {!noMatches && (
            <>
              <div className="dashboard-header">
                <div className="column">Name</div>
                <div className="column">QR Code</div>
                <div className="column">Stamp Image</div>
                <div className="column">Venue</div>
                <div className="column">Description</div>
                <div className="column">Status</div>
                <div className="column"># of People Attended</div>
                <div className="column">Edit/Delete</div>
              </div>

              {events.length ? (
                <ul className="event-list">
                  {displayedEvents.map((event: Event) => (
                    <li key={event._id} className="event-item">
                      <div className="column">{event.eventName}</div>
                      <div className="column">
                        <a href={event.QRcode} target="_blank">
                          <img
                            src={event.QRcode}
                            alt=""
                            className="w-20 mx-auto"
                          />
                        </a>
                      </div>
                      <div className="column">
                        <img
                          src={event.stamp64}
                          alt=""
                          className="w-20 mx-auto"
                        />
                      </div>
                      <div className="column">{event.eventVenue}</div>
                      <div className="column">{event.eventDescription}</div>
                      <div className="column">
                        {event.status ? <p>Active</p> : <p>Inactive</p>}
                      </div>
                      <div className="column">{event.totalAttended}</div>
                      <div className="column">
                        <button
                          className="bg-blue-500  hover:bg-blue-700 w-3/5 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            navigate(`/form/${event._id}`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 mt-1 w-3/5 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            console.log(event._id);
                            setSelectedEventId(event._id);
                            setIsModalOpen(true);
                          }}
                        >
                          Delete
                        </button>
                        <DeleteModal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          onConfirm={() => {
                            handleDelete();
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Spinner />
              )}
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {eventsToShow <
              (searchQuery ? filteredEvents.length : events.length) && (
              <button
                className="load-more-button font-semibold"
                onClick={loadMoreEvents}
              >
                LOAD MORE
              </button>
            )}
          </div>
        </div>
      </div>
    </CheckLoggedInAdmin>
  );
}
