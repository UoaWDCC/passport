// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";

// const router = createBrowserRouter([
//   {
//     path: '/:name',
//     element: <Home />,
//   },
// ]);

import GoogleSigninBtn from './components/GoogleSigninBtn.tsx';

export default function App() {
  const handleClick = (): void => {
    console.log('Custom Button was clicked!');
  };
  
  return (
    <div>
      <GoogleSigninBtn onClick={handleClick}></GoogleSigninBtn>
    </div>
  );
}
