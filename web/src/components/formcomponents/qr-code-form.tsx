import { useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QRCodeForm() {
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [validSubmit, setValidSubmit] = useState("no");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate();

    const submitForm = async () => {
        const startDateTime = combineDateAndTime(startDate, startTime);
        const endDateTime = combineDateAndTime(endDate, endTime);

        if (eventName && startDateTime && endDateTime && imageFile) {
            if (endDateTime < startDateTime) {
                setValidSubmit("errorEndBeforeStart");
                return;
            }

            // Get the user's UTC offset in minutes
            const utcOffset = new Date().getTimezoneOffset();

            const formData = new FormData();
            formData.append("eventName", eventName);
            formData.append("startDate", startDateTime.toISOString());
            formData.append("endDate", endDateTime.toISOString());
            formData.append("utcOffset", utcOffset.toString()); // Store UTC offset
            formData.append("file", imageFile);

            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/event`,
                formData,
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

    const combineDateAndTime = (date: string, time: string): Date => {
        const [year, month, day] = date.split("-");
        const [hours, minutes] = time.split(":");

        return new Date(
            Number(year),
            Number(month) - 1, // month is zero-based in ts
            Number(day),
            Number(hours),
            Number(minutes)
        );
    };

    const checkValidStartDate = (date: any) => {
        const today = new Date();
        const selectedStartDate = new Date(date);

        if (selectedStartDate >= today) {
            setStartDate(date);
            setValidSubmit("no");
        } else {
            setStartDate("");
            setValidSubmit("errorStartDate");
        }
    };

    const checkValidEndDate = (date: any) => {
        const selectedEndDate = new Date(date);
        const selectedStartDate = new Date(startDate);

        if (selectedEndDate >= selectedStartDate) {
            setEndDate(date);
            setValidSubmit("no");
        } else {
            setEndDate("");
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
                    <label className="input-label" htmlFor="start-date">
                        Start Date & Time
                    </label>
                    <input
                        className="event-inputs date-inputs"
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => checkValidStartDate(e.target.value)}
                    />
                    <input
                        className="event-inputs time-inputs mt-2"
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <div className="input-section">
                    <label className="input-label" htmlFor="end-date">
                        End Date & Time
                    </label>
                    <input
                        className="event-inputs date-inputs"
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => checkValidEndDate(e.target.value)}
                    />
                    <input
                        className="event-inputs time-inputs mt-2"
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
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
