import { useState } from "react";
import Upload from '../../assets/upload.svg';
import Bin from '../../assets/bin.svg';

function StampSection() {
    const [stamp, setStamp] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileName, setFileName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            let stampSize = e.target.files[0].size
            if (stampSize < 1000000) {
                setFileSize((stampSize / 1000).toFixed(2) + ' kb');
            } else {
                setFileSize((stampSize / 1000000).toFixed(2) + ' mb');
            }
            let stampName = e.target.value;
            let stampDisplayName = e.target.files[0].name;
            setStamp(stampName);
            if (stampDisplayName.length < 23) {
                setFileName(stampDisplayName);
            } else {
                setFileName(stampDisplayName.substring(0,19) + '...');
            }
        }
    }

    const handleUploadClick = () => {
        const stampElement = document.getElementById('stamp');
        if (stampElement) {
            stampElement.click();
        }
    };

    const handleBinClick = (e: React.MouseEvent<HTMLImageElement>) => {
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
                onChange={handleChange} />
                {!stamp && <p className='stamp-text'>select image to upload</p>}
                {stamp && <p className='stamp-text'>{fileName}</p>}
                {stamp && <p className='stamp-text' id='file-size'>{fileSize}</p>}
                {stamp && <img className="stamp-input-image" id="bin" src={Bin} alt="Bin" onClick={handleBinClick} />}
                {!stamp && <img className="stamp-input-image" id='upload' src={Upload} alt="Upload" onClick={handleUploadClick} />}
            </div>
        </div>
    )
}

export default StampSection;