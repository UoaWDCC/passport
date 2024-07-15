import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import HamburgerMenu from "@components/HamburgerMenu";
import "../styles/page styles/Passport.css";
import CheckLoggedIn from "@components/CheckLoggedIn.tsx";
import GetLeaderboardStats from "@components/LeaderboardStats.tsx";

export default function Passport() {
    const userData = GetLeaderboardStats();
    // initialise index state
    const [currentIndex, setCurrentIndex] = useState(0);

    // initialise temporary page array
    const views = [PassportMain, PassportPage, PassportPage];

    // const pageArray = ["Passport Page", "Leaderbord Page"];
    // const linkArray = ["/passport", "/leaderboard"];

    // function to switch to next page
    const goToNextView = () => {
        if (currentIndex < views.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // function to switch to previous page
    const goToPreviousView = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // retrieves the page component from the array
    const CurrentView = views[currentIndex];

    // handlers for swiping
    const swipeHandlers = useSwipeable({
        onSwipedLeft: goToNextView,
        onSwipedRight: goToPreviousView,
    })

    return (
        <CheckLoggedIn>
            <div {...swipeHandlers} className="background flex flex-col h-screen justify-center items-center ">

                {/* <HamburgerMenu pages={pageArray} links={linkArray} /> */}
                <HamburgerMenu />
                <div className=" flex items-start w-88">
                    <div className="pt-3 text-left flex item-start">
                        <h1 className="text-2xl text-blue-950"><span className="italic">Welcome</span> <span className="font-semibold">{userData.firstName}</span></h1>
                    </div>
                </div>
                <div>
                    <div className="border-b-4 welcome-line w-88 mb-1 mt-3"></div>
                        <div className=" text-center text-blue-950 ">  <span className="text-4xl font-semibold">{userData.totalStamps} </span> <span className="text-xl">Stamps Collected</span></div>
                        <div className="border-b-4 welcome-line w-88 mb-4 mt-1"></div>
                    </div>
                <CurrentView />
                
                <p>Page {currentIndex + 1}</p>
            </div>
        </CheckLoggedIn>
    );
}