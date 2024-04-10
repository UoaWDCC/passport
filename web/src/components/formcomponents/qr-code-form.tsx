import { useEffect, useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function QRCodeForm() {

  const [eventName, setEventName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [image64, setImage64] = useState("")
  const [validSubmit, setValidSubmit] = useState("no")
  const [imageName, setImageName] = useState("")

  const navigate = useNavigate()

  const submitForm = async () => {
    if (eventName && startDate && endDate) {
      const response = await axios.post('http://localhost:3000/api/event',
        {
          "eventName": eventName,
          "stamp64": image64,
          "startDate": startDate,
          "endDate": endDate
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setEventName("")
      setImage64("")
      navigate("/Dashboard")
    }
    setValidSubmit("error")
    console.log("clicked")
  }

  const getImageName = (img: string) => {
    console.log(img)
    setImageName(img)
  }

  const getImage64 = (img: string) => {
    console.log(img)
    setImage64(img)
  }

  return (

    <div className="qr-code-form">
      <h1 className="header">QR Code Generator</h1>
      {validSubmit == "error" ?
        <p className="error-msg">Please fill in the required areas</p>
        :
        null
      }

      <div className="form-form">
        <div className='input-section'>
          <label className='input-label' htmlFor='event-name'>Event Name</label>
          <input
            className="event-inputs"
            id='event-name'
            type='text'
            placeholder='e.g. The Amazing Race'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)} />
        </div>

        <div className='input-section'>
          <label className='input-label' htmlFor='event-name'>Start Date</label>
          <input
            className="event-inputs date-inputs"
            id='start-date'
            type='date'
            placeholder='dd/mm/yy'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className='input-section'>
          <label className='input-label' htmlFor='event-name'>End Date</label>
          <input
            className="event-inputs date-inputs"
            id='end-date'
            type='date'
            placeholder='dd/mm/yy'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)} />
        </div>


        <StampSection getImageName={getImageName} getImage64={getImage64} />

        <div className="submit-button-container">
          <div
            className="submit-link"
          >
            <button className="qr-submit-button" onClick={submitForm}>
              Finish!
            </button>
          </div>
        </div>
      </div>

     

    </div>
  );
}

export default QRCodeForm;