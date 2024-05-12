import { useState } from "react";
import { Link } from "react-router-dom";
import StampsAwayCount from "@components/StampsAwayCount";
import ProgressBar from "@components/ProgressBar";
import RedeemPrizeButton from "@components/RedeemPrizeButton";
import "../styles/page styles/Leaderboard.css";
import PrizesAchieved from "@components/PrizesAchieved";
import CheckLoggedIn from "@components/CheckLoggedIn";

export default function Leaderboard() {
  const [height] = useState(5);

  return (
    <CheckLoggedIn>
      <div className="leaderboard-main h-screen flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <ProgressBar height={height} />
          <StampsAwayCount height={height} />
        </div>
        {height >= 5 ? (
        <Link to="/leaderboard-prize">
          <button className="mt-6">
              <RedeemPrizeButton />
            </button>
        </Link>
      ) : (
        <div className="mt-6">
        <PrizesAchieved/>
        </div>
      )}
    </div>
  </CheckLoggedIn>
  );
}