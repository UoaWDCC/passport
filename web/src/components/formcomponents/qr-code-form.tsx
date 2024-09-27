import { useEffect, useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function QRCodeForm() {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  // const [validStartDate, setValidStartDate] = useState("");
  // const [validEndDate, setValidEndDate] = useState("");
  // const [image64, setImage64] = useState("");
  const [validSubmit, setValidSubmit] = useState("no");
  const [_, setImageName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  // Fetch event details when editing
  useEffect(() => {
    if (eventId) {
      setIsEditMode(true);
      fetchEventDetails();
    }
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/get-single-event/${eventId}`
      );
      const event = response.data;

      // Populate form with event data
      setEventName(event.eventName);
      setStartDateTime(event.startDate.split("T")[0]); // Assuming these fields exist in your API response
      setEndDateTime(event.endDate.split("T")[0]);
      // Handle image if necessary
      // setImageFile(); - You would need to handle the image data here if needed
    } catch (error) {
      console.error("Error fetching event data", error);
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
      formData.append("file", imageFile);

      if (isEditMode) {
        formData.append("eventId", eventId!);
      }

      try {
        // Use POST for both creating and updating
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/event`,
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

  useEffect(() => {
    console.log("test", imageFile);
  }, [imageFile]);

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
    <div className="qr-code-form">
      <h1 className="header">QR Code Generator</h1>
      {validSubmit === "error" && (
        <p className="error-msg">Please fill in the required areas</p>
      )}
      {validSubmit === "errorEndBeforeStart" && (
        <p className="error-msg">End time cannot be before start time</p>
      )}
      {validSubmit === "errorStartDate" && (
        <p className="error-msg mt-2">Start date must be today or later</p>
      )}
      {validSubmit === "errorEndDate" && (
        <p className="error-msg">End date must be after start date</p>
      )}
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

      <StampSection
        getImageFile={getImageFile}
        getImageName={getImageName}
        getImage64={getImage64}
      />

      <div className="submit-button-container">
        <button className="qr-submit-button" onClick={submitForm}>
          Finish!
        </button>
      </div>
    </div>
  );
}

export default QRCodeForm;
