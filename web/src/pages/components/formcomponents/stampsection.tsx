import { useState } from "react";
import Upload from '../../../assets/Upload.svg';
import Bin from '../../../assets/bin.svg';

function StampSection() {
    const [stamp, setStamp] = useState('');

    const handleUploadClick = () => {
        document.getElementById('stamp').click();
    };

    const handleBinClick = () => {
        setStamp('');
    };

    return (
        <div className='input-section'>
            <label className='input-label' htmlFor='stamp'>Custom Stamp Image</label>
            <br />
            <div className="visible-stamp">
                <input 
                id='stamp' 
                type='file' 
                accept='.png'
                value={stamp} 
                onChange={(e) => setStamp(e.target.value)} />
                {stamp && <img className="stamp-input-image" id="bin" src={Bin} alt="Stamp" onClick={handleBinClick} />}
                {!stamp && <img className="stamp-input-image" src={Upload} alt="Stamp" onClick={handleUploadClick} />}
            </div>
        </div>
    )
}

export default StampSection;