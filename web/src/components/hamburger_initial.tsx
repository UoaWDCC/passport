// make placeholders for leadboard and passport.
// placeholders for elements 
// 101 to react 
// making a page putting squares 
// should be ez? 

import React, { useState } from "react";
import styles from "./hamburger_initial.module.css"

// HamburgerMenu component
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.parent_container}>
      <div>
        {/* Hamburger icon */}
        <button className={styles.hamburger_icon} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.half_bar}></div>
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
    </div>
  );
};

export { HamburgerMenu};

