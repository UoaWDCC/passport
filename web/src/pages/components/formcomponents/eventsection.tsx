import { useState } from "react";


function EventSection() {
    const [event, setEvent] = useState('');

    return (
        <div className='event-section'>
            <label htmlFor='event-name'>Event Name</label>
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