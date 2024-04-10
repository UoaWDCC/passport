//import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { HamburgerMenu, LeaderboardPlaceholder } from "./pages/Passport_home";

// this page is the intersection. 

const router = createBrowserRouter([
  {
    path: "/passport2",
    element: (
      <div className = "link-container">
        <h1>WDCC Digital Passport</h1>
        
        <HamburgerMenu />
        <LeaderboardPlaceholder />
        
      </div>
    ),
  },
  
  {
    path: "/leaderboard2",
    element:  (
      <div>
        <HamburgerMenu />, 
        <LeaderboardPlaceholder />
        </div>
    
    )
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

