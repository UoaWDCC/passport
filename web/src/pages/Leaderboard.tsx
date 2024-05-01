import StampsAwayCount from "@components/StampsAwayCount";
import ProgressBar from "@components/ProgressBar";
import "../styles/page styles/Leaderboard.css";
import PrizesAchieved from "@components/PrizesAchieved";

export default function Leaderboard() {
  return (
    <div className="passport-main h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <ProgressBar />

        <StampsAwayCount />
      </div>
      <PrizesAchieved className="mt-6" />
    </div>
  );
}
