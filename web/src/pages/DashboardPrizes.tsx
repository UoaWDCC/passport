import PrizeTable from "@components/dashboard/PrizeTable";
import HamburgerMenu from "@components/HamburgerMenuAdmin";
import "../styles/page styles/event.css"
import logo from "../assets/primary_logo.svg";

function DashboardPrizes() {
    return (
        <div className="custom-blue min-h-screen">
            <HamburgerMenu />
            <div>
                <h1 className="title">Prize Dashboard</h1>
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div
                id="prize-table-div"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <PrizeTable />
            </div>
        </div>
    );
}

export default DashboardPrizes;
