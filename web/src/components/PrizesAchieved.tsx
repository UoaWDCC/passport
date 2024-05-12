import Present from "../assets/present.svg";
import "../styles/page styles/Leaderboard.css";

export default function PrizesAchieved() {
  //  anconst [prizes, setPrizes] = useState();
  const temp = 2;

  return (
    <div className={`flex items-center justify-center text-xl text-blue-950`}>
      <p className="font-semibold text-4xl mr-4">{temp} x </p>
      <img src={Present} alt="" className="mr-4" />
      <div className="flex flex-col text-center">
        <span>prizes</span>
        <span>achieved</span>
      </div>
    </div>
  );
}
