import { useEffect, useState } from "react";
import PrizeTable from "@components/dashboard/PrizeTable";
import HamburgerMenu from "@components/HamburgerMenuAdmin";
import "../styles/page styles/event.css";
import logo from "../assets/primary_logo.svg";
import ErrorPage from "@pages/MobileErrorPage";
import CheckLoggedInAdmin from "@components/CheckLoggedInAdmin";

function DashboardPrizes() {
  const [isMobile, setIsMobile] = useState(false);
  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <ErrorPage />;
  }
  return (
    <CheckLoggedInAdmin>
      <div>
        <HamburgerMenu />
        <div>
          <h1 className="title">Prizes Dashboard</h1>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div
          id="prize-table-div"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <PrizeTable />
        </div>
      </div>
    </CheckLoggedInAdmin>
  );
}

export default DashboardPrizes;
