import { useState } from "react";
import Upload from '../../../assets/Upload.svg';
import Bin from '../../../assets/bin.svg';

function StampSection() {
    const [stamp, setStamp] = useState(null);
    const [fileSize, setFileSize] = useState('');
    const HandleChange = (e) => {
        setFileSize((e.target.files[0].size / 1000).toFixed(2) + ' kb');
        setStamp(e.target.value);
    }


    const handleUploadClick = () => {
        document.getElementById('stamp').click();
    };

    const handleBinClick = (e) => {
        e.stopPropagation();
        setStamp('');
    };

    return (
        <div className='input-section'>
            <label className='input-label' htmlFor='stamp'>Custom Stamp Image</label>
            <br />
            <div className="visible-stamp" onClick={handleUploadClick}>
                <input 
                id='stamp' 
                type='file' 
                accept='.png'
                value={stamp} 
                onChange={HandleChange} />
                {!stamp && <p className='stamp-text'>select image to upload</p>}
                {stamp && <p className='stamp-text'>{stamp.split("\\")[stamp.split("\\").length - 1]}</p>}
                {stamp && <p className='stamp-text' id='file-size'>{fileSize}</p>}
                {stamp && <img className="stamp-input-image" id="bin" src={Bin} alt="Bin" onClick={handleBinClick} />}
                {!stamp && <img className="stamp-input-image" id='upload' src={Upload} alt="Upload" />}
            </div>
        </div>
    )
}

export default StampSection;