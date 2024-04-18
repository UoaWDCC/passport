import { useState } from "react";

export default function StampsAwayCount() {
    const [stampsAway, setStampsAway] = useState();
    const temp = 2;

    return (
        <div className="text-center text-xl">
            <p className="font-bold text-2xl">{temp}</p>
            <div className="flex flex-col text-center">
                <span>Stamps</span>
                <span>away from</span>
                <span>the next</span>
                <span>prize!</span>
            </div>
        </div>
    );
}
