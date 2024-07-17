import { useState, useEffect } from "react";
import Upload from '../../assets/upload.svg';
import Bin from '../../assets/bin.svg';
import axios from "axios";
import { act } from "react-dom/test-utils";

interface StampSectionProps {
    getImageName: (name:string) => void;
    getImage64: (name: string) => void;
}

function StampSection({getImageName, getImage64}: StampSectionProps) {
    const [stamp, setStamp] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileName, setFileName] = useState('');
    const [imageBase64, setBase64String] = useState("")
    const [actualFile, setActualFile] = useState<File | null>(null)

    
    useEffect(()=>{
        getImage64(imageBase64)
        getImageName(fileName)
    },[imageBase64, fileName])

    const uploadImageFile = async() =>{
        if(actualFile){
            const formData = new FormData()
            formData.append('image', actualFile[0])
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/imageTest`,
                formData
            );
        }
         
        
    }

    useEffect(()=>{
        console.log("insideUE", actualFile)
        const skeet = async() => {
            await uploadImageFile()
        }

        skeet()
    },[actualFile])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("this is the file", e.target.files)
        if (e.target.files) {
            setActualFile(e.target.files)
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
                getImageName(fileName)
            } else {
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
                    className="event-inputs"
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