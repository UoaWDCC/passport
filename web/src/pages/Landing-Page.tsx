import WDCCLogo from "../assets/WDCC_Logo.svg";
import { useNavigate } from "react-router";
import styles from "../styles/page styles/Landing-Page.module.css";
import axios from "axios";
import updateStampValues from "@components/GetTotalStamps";
import checkEventStatus from "@components/event-valid";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    try {
      const eventId = location.pathname.split('/').pop();
      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/check-user`, { accessToken });
      if (eventId) {
        if (response.data.success && accessToken) {
          console.log("User is logged in");
          try {
            checkEventStatus(eventId).then(async (eventStatus) => {
            if (eventStatus.status) {
              await updateStampValues(accessToken);
            } else {
              navigate("/qr-error/" + eventId);
            }
          });
          } catch (error) {
            navigate("/qr-error/" + eventId);
          }
          navigate("/passport");
        } else {
          console.log("User is not logged in");
          navigate("/sign-in/" + eventId); // if not signed in, check after sign in
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
  };
};
  return (
    <div className={styles.background}>
      <title>WDCC Passport</title>
      <img
        className="absolute top-[0.1em] md:top-[3em] right-[1.5em] md:right-[3em] w-[9em] h-auto"
        src={WDCCLogo}
        alt="WDCC Logo"
      />
      <div className="flex flex-col-reverse md:flex-row gap-20 max-w-7xl mx-auto items-center justify-center p-12 lg:p-24 rounded-xl">
        <div className="flex flex-col gap-16">
          <h1 className="text-[#e1ebff] text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            WDCC passport
          </h1>

          <div className="text-[#e1ebff] text-lg font-semibold opacity-90 font-sans flex flex-col gap-6">
            <p>
              {" "}
              Unlock a world of engagement with WDCC Passport!
            </p>
            <p>
              {" "}
              Scan, attend, and collect rewards as you embark on your journey through WDCC events.
            </p>
            <a href="/team">Developed by WDCC. Meet our Team!</a>
            <a className="text-sm" href="/privacy-policy">
              Our Privacy Policy
            </a>
          </div>
          <div>
            <button
              onClick={handleButtonClick}
              className="bg-[#e1ebff] text-[#03045e] font-semibold text-lg py-2 px-4 rounded-lg">
                Get Started </button>
          </div>
        </div>
      </div>
    </div>
  );
};