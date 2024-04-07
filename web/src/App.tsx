// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import GoogleSigninBtn from "./components/GoogleSigninBtn.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello World!</p>
        <Link to="newpage">Other Page</Link>
        <div>
          <Link to="temp-login">Login</Link>
        </div>
      </div>
    ),
  },
  {
    path: "/passport",
    element: <Passport />,
  },
  {
    path: "/temp-login",
    element: <Login />,
  },
])

export default function App() {
  const handleClick = (): void => {
    console.log("Custom Button was clicked!")
  }

  return (
    <div>
      <GoogleSigninBtn onClick={handleClick} />
      <RouterProvider router={router} />;
    </div>
  )
}
