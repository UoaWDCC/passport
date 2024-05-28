import Present from "../assets/present.svg";
import "../styles/page styles/Leaderboard.css";

export default function PrizesAchieved({ height }: { height: number }) {
  return (
    <div className={`flex items-center justify-center text-xl text-blue-950`}>
      <p className="font-semibold text-4xl mr-4">{height} x </p>
      <img src={Present} alt="" className="mr-4" />
      <div className="flex flex-col text-center">
        <span>prizes</span>
        <span>achieved</span>
      </div>
    </div>
  );
}
