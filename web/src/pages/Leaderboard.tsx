import StampsAwayCount from "@components/StampsAwayCount";
import ProgressBar from "@components/ProgressBar";
import "../styles/page styles/Leaderboard.css";
import PrizesAchieved from "@components/PrizesAchieved";

export default function Leaderboard() {
    return (
        <div className="passport-main h-screen">
            <h1>Leaderboard</h1>
            <StampsAwayCount />
            <ProgressBar />
            <PrizesAchieved />
        </div>
    );
}
