import Present from "../assets/present.svg";
import "../styles/page styles/Leaderboard.css";

export default function PrizesAchieved() {
  // const [prizes, setPrizes] = useState();
  const temp = 2;

  return (
    <div className="text-center text-xl">
      <p className="font-bold text-2xl">{temp} x </p>
      <img src={Present} alt="" />
      <div className="flex flex-col text-center">
        <span>prizes</span>
        <span>achieved</span>
      </div>
    </div>
  );
}
