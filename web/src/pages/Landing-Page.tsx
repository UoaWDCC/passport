import checkEventStatus from "@components/event-valid";
import axios from "axios";
import { useNavigate } from "react-router";
import WDCCLogo from "../assets/WDCC_Logo.svg";
import styles from "../styles/page styles/Landing-Page.module.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    try {
      const eventId = location.pathname.split("/").pop();
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/check-user`,
        { accessToken }
      );
      if (eventId) {
        if (response.data.success && accessToken) {
          console.log("User is logged in");
          try {
            const eventStatus = await checkEventStatus(eventId);
            console.log(eventStatus);
            if (eventStatus.status) {
              navigate("/qr-error/" + eventId);
            } else {
              navigate("/qr-error/" + eventId);
            }
          } catch (error) {
            navigate("/qr-error/" + eventId);
          }
          navigate("/qr-error/" + eventId);
        } else {
          console.log("User is not logged in");
          navigate("/sign-in/" + eventId);
        }
      } else {
        if (response.data.success && accessToken) {
          console.log("User is logged in");
          navigate("/passport");
        } else {
          console.log("User is not logged in");
          navigate("/sign-in");
        }
      }
    } catch (error) {
      console.error("Error fetching logged-in data:", error);
      navigate("/sign-in");
    }
  };
  return (
    <div className={styles.background}>
      <title>WDCC Passport</title>
      <img
        className="absolute top-0 md:top-[3em] right-[1.5em] md:right-[3em] w-[6em] h-auto"
        src={WDCCLogo}
        alt="WDCC Logo"
      />
      <div className="h-full flex flex-col-reverse md:flex-row gap-20 max-w-7xl mx-auto items-center justify-center p-12 lg:p-24 rounded-xl">
        <div className="h-full flex flex-col gap-16 justify-end">
          <h1 className="text-[#e1ebff] text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center">
            WDCC Passport
          </h1>
          <div className="text-[#e1ebff] text-lg font-semibold opacity-90 font-sans flex flex-col gap-6">
            <p className="text-center text-md">
              Scan, attend, and collect rewards as you embark on your journey
              through WDCC events.
            </p>
          </div>
          <button
            onClick={handleButtonClick}
            className="bg-[#e1ebff] text-[#03045e] font-semibold text-lg py-2 px-4 rounded-lg mb-4"
          >
            Get Started
          </button>
          <div className="flex gap-6 justify-center text-sm text-center text-slate-400">
            <a href="/team">
              <u>Meet the team!</u>
            </a>
            <a href="/privacy-policy">
              <u>Privacy Policy</u>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
