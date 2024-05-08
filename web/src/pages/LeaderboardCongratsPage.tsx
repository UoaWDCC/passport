import congrats_present from "../assets/congrats_present.svg";
import cheering_boy from "../assets/cheering_boy.svg";
import "../styles/page styles/dashboard.css";
import PrizesAchieved from "@components/PrizesAchieved";

function CongratsPage() {
  return (
    <div className="background flex flex-col h-screen justify-center items-center ">
      <div className="pb-30">
        <div className="flex item-start ">
          <img src={congrats_present} className=" mx-auto" />
        </div>
        <div className="pt-6 text-center">
          <h1 className="text-3xl text-blue-950">
            <span className="font-bold">Congratulations!</span>
          </h1>
          <h2 className="text-l text-blue-950 font-semibold">
            {" "}
            You've just won a prize
          </h2>
        </div>
        <div className="pt-3 text-center">
          <h4 className="text-sm text-blue-950">
            {" "}
            <span className="italic">Collect your prize at the next</span>
          </h4>
          <h4 className="text-sm text-blue-950">
            {" "}
            <span className="italic">WDCC event</span>
          </h4>
        </div>
        <img
          src={cheering_boy}
          className="mx-auto"
          width="100"
          height="100"
          alt="Cheering Boy SVG"
        />

        <div className="mt-6">
          <PrizesAchieved />
        </div>
      </div>
    </div>
  );
}

export default CongratsPage;
