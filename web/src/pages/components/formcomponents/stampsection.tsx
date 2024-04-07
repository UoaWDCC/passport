import { useState } from "react";
import Upload from '../../../assets/upload.svg';

function StampSection() {
    const [stamp, setStamp] = useState('');

    return (
        <div className='input-section'>
            <label className='input-label' htmlFor='stamp'>Custom Stamp Image</label>
            <br />
            <input
                id='stamp' 
                type='file' 
                accept='.png'
                value={stamp} 
                onChange={(e) => setStamp(e.target.value)} />
                <img src={Upload} alt="Stamp" />
        </div>
    )
}

export default StampSection;