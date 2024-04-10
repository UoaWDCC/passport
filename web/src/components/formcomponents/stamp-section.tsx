import { useState, ChangeEvent, useEffect } from "react";
import Upload from '../../assets/upload.svg';
import Bin from '../../assets/bin.svg';

interface StampSectionProps {
    getImageName: (name:string) => void;
    getImage64: (name: string) => void;
}

function StampSection({getImageName, getImage64}: StampSectionProps) {
interface StampSectionProps {
    getImageName: (name:string) => void;
    getImage64: (name: string) => void;
}

function StampSection({getImageName, getImage64}: StampSectionProps) {
interface StampSectionProps {
    getImageName: (name:string) => void;
    getImage64: (name: string) => void;
}

function StampSection({getImageName, getImage64}: StampSectionProps) {
    const [stamp, setStamp] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileName, setFileName] = useState('');
    const [imageBase64, setBase64String] = useState("")

    
    useEffect(()=>{
        getImage64(imageBase64)
        getImageName(fileName)
    },[imageBase64, fileName])
    const [imageBase64, setBase64String] = useState("")

    
    useEffect(()=>{
        getImage64(imageBase64)
        getImageName(fileName)
    },[imageBase64, fileName])
    const [imageBase64, setBase64String] = useState("")

    
    useEffect(()=>{
        getImage64(imageBase64)
        getImageName(fileName)
    },[imageBase64, fileName])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (e.target.files) {
        console.log(e.target.files)
        if (e.target.files) {
        console.log(e.target.files)
        if (e.target.files) {
            let stampSize = e.target.files[0].size
            if (stampSize < 1000000) {
                setFileSize((stampSize / 1000).toFixed(2) + ' kb');
            } else {
                setFileSize((stampSize / 1000000).toFixed(2) + ' mb');
            }
            let stampName = e.target.value;
            console.log("skeet")
            console.log(stampName)
            let stampDisplayName = e.target.files[0].name;
            setStamp(stampName);
            if (stampDisplayName.length < 23) {
                setFileName(stampDisplayName);
                getImageName(fileName)
                getImageName(fileName)
                getImageName(fileName)
            } else {
                setFileName(stampDisplayName.substring(0, 19) + '...');
                setFileName(stampDisplayName.substring(0, 19) + '...');
                setFileName(stampDisplayName.substring(0, 19) + '...');
            }

            const file = e.target.files?.[0];

            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setBase64String(result);
                    getImage64(imageBase64)
                }
            };

            reader.readAsDataURL(file);

            const file = e.target.files?.[0];

            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setBase64String(result);
                    getImage64(imageBase64)
                }
            };

            reader.readAsDataURL(file);

            const file = e.target.files?.[0];

            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setBase64String(result);
                    getImage64(imageBase64)
                }
            };

            reader.readAsDataURL(file);
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
            <div className="visible-stamp" onClick={handleUploadClick}>
                <input
                    id='stamp'
                    type='file'
                    accept='.png'
                    value={stamp}
                    onChange={
                        handleChange
                    } />
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