import { useState } from "react";
import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import { ReactComponent as LeftButton } from "../assets/LeftButton.svg";
import { ReactComponent as RightButton } from "../assets/RightButton.svg";
import "../styles/Passport.css";

export default function Passport() {
  // initialise index state
  const [currentIndex, setCurrentIndex] = useState(0);

  // initialise temporary page array
  const views = [PassportMain, PassportPage, PassportPage];

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

  return (
    <div className="background flex flex-col h-screen justify-center items-center ">
      <CurrentView />
  
        {/* Display navigation buttons */}
      <div className="text-black flex justify-center gap-4">
        {/* Display arrows depending on the current page index */}
        {currentIndex > 0 && (
          <button onClick={goToPreviousView} className="svg-button">
            <LeftButton />
          </button>
        )}
        {currentIndex < views.length - 1 && (
          <button onClick={goToNextView} className="svg-button">
            <RightButton />
          </button>
        )}
      </div>

      <p>Page {currentIndex + 1}</p>
    </div>
  );
}
