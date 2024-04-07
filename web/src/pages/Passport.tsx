import { useState } from "react";
import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import HamburgerMenu from "@components/HamburgerMenu";
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
      <HamburgerMenu />
      <CurrentView />

      <div className="text-black">
        {/* display arrows depending on the current page index */}
        {currentIndex > 0 && <button onClick={goToPreviousView}> ← </button>}
        {currentIndex < views.length - 1 && (
          <button onClick={goToNextView}> → </button>
        )}
      </div>

      <p>Page {currentIndex + 1}</p>
    </div>
  );
}
