import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import LeftButton from "../components/LeftButton.tsx";
import RightButton from "../components/RightButton.tsx";
import HamburgerMenu from "@components/HamburgerMenu";
import StampCount from "@components/StampCount.tsx";
import "../styles/page styles/Passport.css";
import WelcomeMessage from "@components/WelcomeMessage.tsx";
import CheckLoggedIn from "@components/CheckLoggedIn.tsx";

export default function Passport() {
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
                    <WelcomeMessage />
                </div>
                <StampCount />

        	    <div className = "text-center">
                    <p>Swipe left or right to navigate through pages.</p>
                </div>

                <CurrentView />
                
                <p>Page {currentIndex + 1}</p>
            </div>
        </CheckLoggedIn>
    );
}