import { useEffect, useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface QRCodeFormProps {
    eventId: string;
}

const QRCodeForm: React.FC<QRCodeFormProps> = ({ eventId }) => {
    const [eventName, setEventName] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [validSubmit, setValidSubmit] = useState("no");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [stamp64, setStamp64] = useState("");
    const [_, setImageName] = useState("");
    const navigate = useNavigate();

    // Fetch event details when editing
    useEffect(() => {
        console.log("event id: " + eventId);

        if (eventId !== "form") {
            setIsEditMode(true);
            fetchEventDetails(eventId);
        }
    }, [eventId]);

    const fetchEventDetails = async (eventId: string) => {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/event/get-single-event/${eventId}`
            );
            const event = response.data;
            console.log(event);

            // Populate form with event data
            setEventName(event.eventName);
            setStartDateTime(event.startDate.split("Z")[0]); // Assuming these fields exist in your API response
            setEndDateTime(event.endDate.split("Z")[0]);
            setStamp64(event.stamp64);
            // Handle image if necessary
            // setImageFile(); - You would need to handle the image data here if needed
        } catch (error) {
            console.error("Error fetching event data", error);
        }
    };

    const submitEditForm = async () => {
        if (eventName && startDateTime && endDateTime && stamp64) {
            const startDate = new Date(startDateTime);
            const endDate = new Date(endDateTime);

            if (endDate < startDate) {
                setValidSubmit("errorEndBeforeStart");
                return;
            }

            const utcOffset = new Date().getTimezoneOffset();

            const formData = new FormData();
            formData.append("eventId", eventId!);
            formData.append("eventName", eventName);
            formData.append("startDate", startDate.toISOString());
            formData.append("endDate", endDate.toISOString());
            formData.append("utcOffset", utcOffset.toString());
            formData.append("file", stamp64[0]);

            try {
                await axios
                    .put(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/api/event/edit-event`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    )
                    .then(() => {
                        navigate("/dashboard/events");
                    });
            } catch (error) {
                console.error("Error submitting form", error);
                setValidSubmit("error");
            }
        } else {
            setValidSubmit("error");
        }
    };

    const submitForm = async () => {
        console.log(imageFile);
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
            formData.append("utcOffset", utcOffset.toString());
            formData.append("eventVenue", eventVenue);
            formData.append("eventDescription", eventDescription);
            formData.append("file", imageFile);

            if (isEditMode) {
                formData.append("eventId", eventId!);
            }

            try {
                // Use POST for both creating and updating
                await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/event/add-event`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                // Reset the form only if the request succeeds
                setEventName("");
                setStartDateTime("");
                setEndDateTime("");
                setImageFile(null);
                setValidSubmit("yes");
                navigate("/dashboard/events");
            } catch (error) {
                console.error("Error submitting form", error);
                setValidSubmit("error");
            }
        } else {
            setValidSubmit("error");
        }
    };

    // useEffect(() => {
    //     console.log("test", imageFile);
    // }, [imageFile]);

    const getImageFile = (img: File | null) => {
        setImageFile(img);
    };

    const getImageName = (img: string) => {
        console.log(img);
        setImageName(img);
    };

    const getImage64 = (img: string) => {
        console.log(img);
        // setImage64(img);
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
        <div className="qr-code-form mb-16">
            {isEditMode ? (
                <h1 className="header">Edit Event</h1>
            ) : (
                <h1 className="header">Create Event</h1>
            )}

            <div className="input-section">
                <label className="input-label mt-5" htmlFor="event-name">
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

                <label className="input-label mt-5" htmlFor="start-datetime">
                    Start Date & Time
                </label>
                <input
                    className="event-inputs date-inputs"
                    id="start-datetime"
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => {
                        console.log("inside start date: ", e.target.value);
                        console.log(startDateTime);
                        checkValidStartDate(e.target.value);
                    }}
                />
                {validSubmit === "errorStartDate" && (
                    <p className="error-msg">
                        Start date must be today's date or later
                    </p>
                )}
            </div>

            <div className="input-section mt-5">
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
                {validSubmit === "errorEndDate" && (
                    <p className="error-msg">
                        End date must be after start date
                    </p>
                )}
                {validSubmit === "errorEndBeforeStart" && (
                    <p className="error-msg">
                        End time cannot be before start time
                    </p>
                )}
            </div>

            <div className="input-section mt-4">
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

            <div className="input-section mt-4">
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

            <div className="mt-5">
                <StampSection
                    getImageFile={getImageFile}
                    getImageName={getImageName}
                    getImage64={getImage64}
                    isEditMode={isEditMode}
                    stamp64={stamp64}
                    setStamp64={setStamp64}
                />
            </div>

            <div className="submit-button-container mt-5 flex flex-col justify-center">
                {isEditMode ? (
                    <button
                        className="qr-submit-button"
                        onClick={submitEditForm}
                    >
                        Confirm Edit
                    </button>
                ) : (
                    <button className="qr-submit-button" onClick={submitForm}>
                        Finish
                    </button>
                )}
                {validSubmit === "error" && (
                    <p className="error-msg">Please fill in all fields</p>
                )}
            </div>
        </div>
    );
};

export default QRCodeForm;
