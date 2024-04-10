//import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { HamburgerMenu, LeaderboardPlaceholder } from "./pages/Passport_home";

// this page is the intersection. 

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className = "link-container">
        <h1>WDCC Digital Passport</h1>
        <Link to="passport">Leaderboard</Link>
        <HamburgerMenu />
        <LeaderboardPlaceholder />
        
      </div>
    ),
  },
  
  {
    path: "/passport",
    element:  (
      <div>
        <HamburgerMenu />, 
        
        </div>
    
    )
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

