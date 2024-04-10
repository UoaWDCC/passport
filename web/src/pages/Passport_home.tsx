// make placeholders for leadboard and passport.
// placeholders for elements 
// 101 to react 
// making a page putting squares 
// should be ez? 

import React, { useState } from "react";

// HamburgerMenu component
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="parent-container">
      <div className="hamburger-menu "> {/* Added background color */}
        {/* Hamburger icon */}
        <button className="hamburger-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="half-bar"></div>
        </button>
      </div>
      {/* Menu items */}
      {isOpen && (
        <div className="menu-items">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      )}
      {/* Red triangle */}
      <div className="absolute right-0 top-0 aspect-square w-[200px] flex items-center justify-right">
        <div className="absolute z-10" style={{ top: "15%", right: "13%", transform: "translate(50%, -50%)" }}> <p className= "paragraph-type-2">xX</p></div>
        <div className="absolute w-full aspect-square bg-red-500" style={{ top: "-120px", right: "-120px", transform: "rotate(45deg)" }}></div>
      </div>
    </div>
  );
};

// LeaderboardPlaceholder component
const LeaderboardPlaceholder = () => {
  return (
    <div className="leaderboard-placeholder">
      <h1>Leaderboard Placeholder</h1>
      <p>Welcome to the Leaderboard page!</p>
      {/* Rectangle container */}
      <div className="rectangle-container">
        {/* Rectangle */}
        <div className="rectangle">
          <div className="logo">
            <img src="./src/assets/WDCC_logo.svg" alt="WDCC Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { HamburgerMenu, LeaderboardPlaceholder };

