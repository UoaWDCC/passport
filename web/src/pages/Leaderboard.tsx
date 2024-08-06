import StampsAwayCount from "@components/StampsAwayCount";
import ProgressBar from "@components/ProgressBar";
import RedeemPrizeButton from "@components/RedeemPrizeButton";
import "../styles/page styles/Leaderboard.css";
import PrizesAchieved from "@components/PrizesAchieved";
import HamburgerMenu from "@components/HamburgerMenu";
import CheckLoggedIn from "@components/CheckLoggedIn";
import LeaderboardStats from "@components/LeaderboardStats";
import GetRedeemedPrizes from "@components/LeaderboardRedeemedPrizes";
import { useEffect } from "react";

export default function Leaderboard() {
  const userData = GetLeaderboardStats()
  const stampsLeft = userData.stampsLeft
  const prizes = userData.prizesAchieved
  const height = 3 - stampsLeft

  return (
    <CheckLoggedIn>
      <div className="leaderboard-main h-screen flex flex-col items-center justify-center">
        <HamburgerMenu />
        <div className="flex items-center space-x-4">
          <ProgressBar height={height} />
          <StampsAwayCount height={stampsLeft} />
        </div>
        {height == 3 ? (
          <button className="mt-6">
            <RedeemPrizeButton />
          </button>
        ) : (
          <div className="mt-6">
            <PrizesAchieved height={prizes} />
          </div>
        )}
      </div>
    </CheckLoggedIn>
  )
}