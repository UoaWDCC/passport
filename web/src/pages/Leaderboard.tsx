import { Link } from "react-router-dom";
import StampsAwayCount from "@components/StampsAwayCount";
import ProgressBar from "@components/ProgressBar";
import RedeemPrizeButton from "@components/RedeemPrizeButton";
import "../styles/page styles/Leaderboard.css";
import PrizesAchieved from "@components/PrizesAchieved";
import HamburgerMenu from "@components/HamburgerMenu";
import CheckLoggedIn from "@components/CheckLoggedIn";
import GetLeaderboardStats from "@components/LeaderboardStats";

export default function Leaderboard() {
    const userData = GetLeaderboardStats();
    const height = userData.totalStamps; // To be removed when other vals in Mongo
    let stampsLeft; // To be updated when it gets calced in Mongo
    if (height % 5 == 0 && height != 0) {
        stampsLeft = 5;  // To be updated when it gets calced in Mongo
    } else {
        stampsLeft = height % 5; // To be updated when it gets calced in Mongo
    } 
    const prizes = Math.floor(height/5); // To be updated when it gets calced in Mongo

    return (
      <CheckLoggedIn>
        <div className="leaderboard-main h-screen flex flex-col items-center justify-center">
            <HamburgerMenu />
            <div className="flex items-center space-x-4">
                <ProgressBar height={stampsLeft} />
                <StampsAwayCount height={5 - stampsLeft} />
            </div>
            {(stampsLeft == 5) ? (
                <Link to="/leaderboard-prize">
                    <button className="mt-6">
                        <RedeemPrizeButton />
                    </button>
                </Link>
            ) : (
                <div className="mt-6">
                    <PrizesAchieved height={prizes} />
                </div>
            )}
        </div>
      </CheckLoggedIn>
    );
}
