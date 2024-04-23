import StampsAwayCount from "@components/StampsAwayCount";
import ProgressBar from "@components/ProgressBar";
import "../styles/page styles/Leaderboard.css";
import PrizesAchieved from "@components/PrizesAchieved";
import bigPresent from "../assets/bigPresent.svg";

export default function Leaderboard() {
  return (
    <div className="passport-main h-screen flex flex-col items-center justify-center">
        <img src={bigPresent} alt="" className="mr-4" />
      <div className="flex items-center">
        <ProgressBar />
        <StampsAwayCount />
      </div>
      <PrizesAchieved />
    </div>
  );
}
