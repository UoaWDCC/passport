import PrizeTable from "@components/dashboard/PrizeTable";
import HamburgerMenu from "@components/HamburgerMenuAdmin";

function DashboardPrizes() {
    return (
        <div>
            <HamburgerMenu />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "16px 32px 0 32px",
                }}
            >
                <h1 style={{ fontSize: "48px" }}>Prize Dashboard</h1>
                <>Logo Placeholder</>
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
