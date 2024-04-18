import { useState } from "react";
import Man from "../assets/man.svg";

export default function ProgressBar() {
    const [height, setHeight] = useState(3);

    return (
        <div className="flex">
            <img src={Man} alt="" />
            <div
                className="bg-blue-500 w-10"
                style={{ height: `${height * 50}px` }}
            ></div>
        </div>
    );
}
