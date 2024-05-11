import manAndBar from "../assets/presentManAndBar.svg";
import barLines from "../assets/barLines.svg";
import airplane from "../assets/airplane.svg";

export default function ProgressBar({ height}: { height: number }) {
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
        {height >= 1 && height <= 4 && (
          <img
            src={airplane}
            alt=""
            className="absolute"
            style={{
              left: "90px", // Adjust this value
              bottom: `${height * 108 - 13}px`, // Adjust this value
            }}
          />
        )}
      </div>
    );
  }