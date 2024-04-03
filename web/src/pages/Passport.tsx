import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import "../styles/Passport.css";

export default function Passport() {
  const views = [PassportMain, PassportPage, PassportPage];
  const CurrentView = views[0];

  return (
    <div className="background flex h-screen justify-center">
      <CurrentView />
    </div>
  );
}
