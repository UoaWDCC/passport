import { useState } from "react";

function EventSection() {
    const [event, setEvent] = useState('');

    return (
        <div className='input-section'>
            <label className='input-label' htmlFor='event-name'>Event Name</label>
            <br />
            <input 
            id='event-name' 
            type='text' 
            placeholder='e.g. The Amazing Race' 
            value={event} 
            onChange={(e) => setEvent(e.target.value)} />
        </div>
    )
}

export default EventSection;