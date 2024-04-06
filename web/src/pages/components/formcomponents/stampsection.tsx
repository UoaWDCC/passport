import { useState } from "react";


function StampSection() {
    const [stamp, setStamp] = useState('');

    return (
        <div className='stamp-section'>
            <label htmlFor='stamp'>Custom Stamp Image</label>
            <input 
                id='stamp' 
                placeholder="Select Image To Upload" 
                type='file' 
                value={stamp} 
                onChange={(e) => setStamp(e.target.value)} />
        </div>
    )
}

export default StampSection;