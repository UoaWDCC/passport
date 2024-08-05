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
  const userData = LeaderboardStats();
  const redeemedPrizes = GetRedeemedPrizes() ?? 0;
  const redeemed = userData.eventList.length / 5 == redeemedPrizes;

  let stampsLeft = 5 - (userData.eventList.length % 5);
  let height = userData.eventList.length % 5;

  if (!redeemed && userData.eventList.length % 5 == 0) {
    height += 5;
    stampsLeft -= 5;
  }

  useEffect(() => {
    if (
      redeemedPrizes == undefined ||
      redeemedPrizes == null ||
      redeemedPrizes == 0 ||
      userData == undefined ||
      userData == null
    ) {
      return;
    }
    if (!redeemed && userData.eventList.length % 5 == 0) {
      console.log("Redirect to leaderboards");
      window.location.href = "/leaderboard-prize";
    }
  }, [redeemedPrizes]);

  return (
    <CheckLoggedIn>
      <div className="leaderboard-main h-screen flex flex-col items-center justify-center">
        <HamburgerMenu />
        <div className="flex items-center space-x-4">
          <ProgressBar height={height} />
          <StampsAwayCount height={stampsLeft} />
        </div>
        {height == 5 ? (
          <button className="mt-6">
            <RedeemPrizeButton />
          </button>
        ) : (
          <div className="mt-6">
            <PrizesAchieved height={redeemedPrizes} />
          </div>
        )}
      </div>
    </CheckLoggedIn>
  );
}
