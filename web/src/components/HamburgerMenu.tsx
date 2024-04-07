import { useState } from "react";
import "../styles/HamburgerMenu.css";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu relative flex mt-6">
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

      <div className={`menu-items ${isOpen ? "open" : ""}`}>
        <a href="#">Passport Page</a>
        <a href="#">Leaderboard Page</a>
      </div>
    </div>
  );
}
