import { useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QRCodeForm() {
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [validStartDate, setValidStartDate] = useState("");
    const [validEndDate, setValidEndDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [image64, setImage64] = useState("");
    const [validSubmit, setValidSubmit] = useState("no");
    const [_, setImageName] = useState("");

    const navigate = useNavigate();

    const submitForm = async () => {
        if (eventName && startDate && endDate) {
            await axios.post(
                `${import.meta.env.SERVER_URL}/api/event`,
                {
                    eventName: eventName,
                    stamp64: image64,
                    startDate: startDate,
                    endDate: endDate,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setEventName("");
            setImage64("");
            navigate("/dashboard/events");
        }
        setValidSubmit("error");
        console.log("clicked");
    };

    const getImageName = (img: string) => {
        console.log(img);
        setImageName(img);
    };

    const getImage64 = (img: string) => {
        console.log(img);
        setImage64(img);
    };

    const checkValidStartDate = (date: any) => {
        if (
            new Date(date).setHours(0, 0, 0, 0) >=
                new Date().setHours(0, 0, 0, 0) &&
            startDate >= endDate
        ) {
            setStartDate(date);
            setValidStartDate("yes");
        } else {
            setStartDate("");
            setValidStartDate("no");
        }
    };

    const checkValidEndDate = (date: any) => {
        if (
            new Date(date).setHours(0, 0, 0, 0) >=
            new Date(startDate).setHours(0, 0, 0, 0)
        ) {
            setEndDate(date);
            setValidEndDate("yes");
        } else {
            setEndDate("");
            setValidEndDate("no");
        }
    };

    return (
        <div className="qr-code-form">
            <h1 className="header">QR Code Generator</h1>
            {validSubmit == "error" ? (
                <p className="error-msg">Please fill in the required areas</p>
            ) : null}

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
                    <label className="input-label" htmlFor="event-name">
                        Start Date{" "}
                        {validStartDate == "no" ? (
                            <p className="error-msg-dates">
                                *invalid start date
                            </p>
                        ) : null}
                    </label>

                    <input
                        className="event-inputs date-inputs"
                        id="start-date"
                        type="date"
                        placeholder="dd/mm/yy"
                        value={startDate}
                        onChange={(e) => checkValidStartDate(e.target.value)}
                    />
                </div>

                <div className="input-section">
                    <label className="input-label" htmlFor="event-name">
                        End Date{" "}
                        {validEndDate == "no" ? (
                            <p className="error-msg-dates">*invalid end date</p>
                        ) : null}
                    </label>

                    <input
                        className="event-inputs date-inputs"
                        id="end-date"
                        type="date"
                        placeholder="dd/mm/yy"
                        value={endDate}
                        onChange={(e) => checkValidEndDate(e.target.value)}
                    />
                </div>

                <StampSection
                    getImageName={getImageName}
                    getImage64={getImage64}
                />

                <div className="submit-button-container">
                    <div className="submit-link">
                        <button
                            className="qr-submit-button"
                            onClick={submitForm}
                        >
                            Finish!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QRCodeForm;
