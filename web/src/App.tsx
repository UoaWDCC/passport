// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { useState } from 'react';
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
      </div>
    ),
  },
  {
    path: "/passport",
    element: <Passport />,
  },
])

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const handleClick = (): void => {
    setShowLogin(true);
    console.log("Custom Button was clicked!");
  }

  return (
    <div>
      <GoogleSigninBtn onClick={handleClick} />
      {showLogin && <Login />}
      <RouterProvider router={router} />;
    </div>
  )
}
