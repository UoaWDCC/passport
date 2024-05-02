import { useState } from "react";
import manAndBar from "../assets/presentManAndBar.svg";
import barLines from "../assets/barLines.svg";

export default function ProgressBar() {
  const [height, setHeight] = useState(3);

  return (
    <div className="relative">
      <img src={manAndBar} alt="" />
      <div
        className="absolute"
        style={{
          backgroundColor: "#097DF1",
          bottom: "16px", // Adjust this value
          left: "96px", // Adjust this value
          width: "36px", // Adjust this value
          height: `${height * 108}px`, // max: 540px (108 per height unit)
        }}
      ></div>
      <img
        src={barLines}
        alt=""
        className="absolute"
        style={{ left: "119px", bottom: "50px" }}
      />
    </div>
  );
}
