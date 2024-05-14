import { useState } from "react";
import "../styles/component styles/HamburgerMenu.css";

export default function HamburgerMenu() {
    // open state for the menu
    const [isOpen, setIsOpen] = useState(false);

    // toggle the open state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`hamburger-menu relative flex mt-6 p-3 ${
                isOpen ? "open" : ""
            }`}
        >
            <div
                className={`hamburger-icon flex flex-col cursor-pointer ${
                    isOpen ? "open" : ""
                }`}
                onClick={toggleMenu}
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <div className={`menu-items hidden ${isOpen ? "open" : ""}`}>
                <a href="/passport">Passport Page</a>
                <a href="/leaderboard">Leaderboard Page</a>
            </div>
        </div>
    );
}
