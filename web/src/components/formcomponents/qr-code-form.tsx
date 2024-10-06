import { useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QRCodeForm() {
    const [eventName, setEventName] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [validSubmit, setValidSubmit] = useState("no");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate();

    const submitForm = async () => {
        if (eventName && startDateTime && endDateTime && imageFile) {
            const startDate = new Date(startDateTime);
            const endDate = new Date(endDateTime);

            if (endDate < startDate) {
                setValidSubmit("errorEndBeforeStart");
                return;
            }

            // Get the user's UTC offset in minutes
            const utcOffset = new Date().getTimezoneOffset();

            const formData = new FormData();
            formData.append("eventName", eventName);
            formData.append("startDate", startDate.toISOString());
            formData.append("endDate", endDate.toISOString());
            formData.append("utcOffset", utcOffset.toString()); // Store UTC offset
            formData.append("eventVenue", eventVenue);
            formData.append("eventDescription", eventDescription);
            formData.append("file", imageFile);

            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/event/add-event`,
                    formData
                ,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setEventName("");
            navigate("/dashboard/events");
        } else {
            setValidSubmit("error");
        }
    };

    const checkValidStartDate = (dateTime: string) => {
        const today = new Date();
        const selectedStartDate = new Date(dateTime);

        if (selectedStartDate >= today) {
            setStartDateTime(dateTime);
            setValidSubmit("no");
        } else {
            setStartDateTime("");
            setValidSubmit("errorStartDate");
        }
    };

    const checkValidEndDate = (dateTime: string) => {
        const selectedEndDate = new Date(dateTime);
        const selectedStartDate = new Date(startDateTime);

        if (selectedEndDate >= selectedStartDate) {
            setEndDateTime(dateTime);
            setValidSubmit("no");
        } else {
            setEndDateTime("");
            setValidSubmit("errorEndDate");
        }
    };

    return (
        <div className="qr-code-form">
            <h1 className="header">QR Code Generator</h1>
            {validSubmit === "error" && (
                <p className="error-msg">Please fill in the required areas</p>
            )}
            {validSubmit === "errorEndBeforeStart" && (
                <p className="error-msg">
                    End time cannot be before start time
                </p>
            )}
            {validSubmit === "errorStartDate" && (
                <p className="error-msg mt-2">
                    Start date must be today or later
                </p>
            )}
            {validSubmit === "errorEndDate" && (
                <p className="error-msg">End date must be after start date</p>
            )}

            <div className="form-form">
                <div className="input-section">
                    <label className="input-label" htmlFor="event-name">
                        Event Name
                    </label>
                    <input
                        className="event-inputs"
                        id="event-name"
                        type="text"
                        placeholder="e.g. The Amazing Race"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>

                <div className="input-section">
                    <label className="input-label" htmlFor="start-datetime">
                        Start Date & Time
                    </label>
                    <input
                        className="event-inputs date-inputs"
                        id="start-datetime"
                        type="datetime-local"
                        value={startDateTime}
                        onChange={(e) => checkValidStartDate(e.target.value)}
                    />
                </div>

                <div className="input-section">
                    <label className="input-label" htmlFor="end-datetime">
                        End Date & Time
                    </label>
                    <input
                        className="event-inputs date-inputs"
                        id="end-datetime"
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => checkValidEndDate(e.target.value)}
                    />
                </div>

                <div className="input-section">
                    <label className="input-label" htmlFor="event-name">
                        Venue Details
                    </label>
                    <input
                        className="event-inputs"
                        id="event-venue"
                        type="text"
                        placeholder="e.g. OGGB 206-213"
                        value={eventVenue}
                        onChange={(e) => setEventVenue(e.target.value)}
                    />
                </div>

                <div className="input-section">
                    <label className="input-label" htmlFor="event-name">
                        Event Description
                    </label>
                    <input
                        className="event-inputs"
                        id="event-description"
                        type="text"
                        placeholder="e.g. A fun day"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                </div>

                <StampSection
                    getImageFile={setImageFile}
                    getImageName={() => {}}
                    getImage64={() => {}}
                />

                <div className="submit-button-container">
                    <button className="qr-submit-button" onClick={submitForm}>
                        Finish!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QRCodeForm;
