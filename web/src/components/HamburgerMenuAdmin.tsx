import { useState } from "react";
import "../styles/component styles/HamburgerMenu.css";

export default function HamburgerMenuAdmin() {
    // open state for the menu
    const [isOpen, setIsOpen] = useState(false);

    // toggle the open state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`hamburger-menu absolute top-0 z-50 flex mt-10 ml-10 p-3 pb-4 ${
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
                <a href="/dashboard/events">Events Page</a>
                <a href="/dashboard/prizes">Prizes Page</a>
            </div>
        </div>
    );
}
