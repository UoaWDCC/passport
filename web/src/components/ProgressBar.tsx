import { useState } from "react";
import Man from "../assets/man.svg";
import manAndBar from "../assets/manAndBar.svg";
import barLines from "../assets/barLines.svg";

export default function ProgressBar() {
    const [height, setHeight] = useState(3);

    return (
        <div className="relative">
            <img src={manAndBar} alt="" />
            <div
                className="absolute"
                style={{ 
                    backgroundColor: '#097DF1',
                    bottom: '16px', // Adjust this value
                    left: '96px', // Adjust this value
                    width: '36px', // Adjust this value
                    height: `${height * 50}px` 
                }}
            ></div>
            <img src={barLines} alt="" className="absolute" style={{ left: '119px', bottom: '50px' }} />
        </div>
    );
}