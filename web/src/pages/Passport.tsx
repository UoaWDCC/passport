import { useState } from "react";
import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import "../styles/Passport.css";

export default function Passport() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const views = [PassportMain, PassportPage, PassportPage];

  const goToNextView = () => {
    if (currentIndex < views.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousView = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const CurrentView = views[currentIndex];

  return (
    <div className="background flex flex-col h-screen justify-center items-center ">
      <CurrentView />

      <div className="text-black">
        {currentIndex > 0 && (
          <button onClick={goToPreviousView}> ← </button>
        )}
        {currentIndex < views.length - 1 && (
          <button onClick={goToNextView}> → </button>
        )}
      </div>

      <p>Page {currentIndex + 1}</p>
    </div>
  );
}
