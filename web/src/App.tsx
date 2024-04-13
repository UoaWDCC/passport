//import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { HamburgerMenu } from "./components/hamburger_initial";

// this page is the intersection. 
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport";
import GoogleSigninBtn from './components/GoogleSigninBtn.tsx';

const handleClick = (): void => {
  console.log('Custom Button was clicked!');
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        
      <div className = "link-container">
        <h1>WDCC Digital Passport</h1>
        <Link to="passport">Other Page</Link>
        <GoogleSigninBtn onClick={handleClick} />
        
      </div>
    ),
  },
  
  {
    path: "/passport",
    element:  (
      <div>
        <HamburgerMenu />, 
        <Passport /> 
        
      </div>
    
    )
  },
]);

export default function App() {
  
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  );
}

