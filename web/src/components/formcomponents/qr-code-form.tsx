import { useEffect, useState } from "react";
import StampSection from "./stamp-section";
import axios from "axios"
import { Link } from "react-router-dom";

function QRCodeForm() {

  const [event, setEvent] = useState('');
  const [eventName, setEventName] = useState("")
  const [image64, setImage64] = useState("")
  const [imageName, setImageName] = useState("")

  const submitForm = async () => {
    const response = await axios.post('http://localhost:3000/api/event',
      {
        "eventName": eventName,
        "stamp64": image64
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    setEventName("")
    setImage64("")
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

      <form className="form-form" autoComplete="off" method="POST">
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
            className="event-inputs"
            id='start-date'
            type='text'
            placeholder='dd/mm/yy'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)} />
        </div>

        <div className='input-section'>
          <label className='input-label' htmlFor='event-name'>End Date</label>

          <input
            className="event-inputs"
            id='end-date'
            type='text'
            placeholder='dd/mm/yy'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)} />
        </div>

        <StampSection getImageName={getImageName} getImage64={getImage64} />

        <div className="submit-button-container">
          <Link
          className="submit-link"
            to='/Dashboard'
          >
            <button className="qr-submit-button" type="submit" onClick={submitForm}>
              Finish!
            </button>
          </Link>
        </div>
      </form>

    </div>
  );
}

export default QRCodeForm;