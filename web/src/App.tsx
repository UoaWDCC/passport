// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import GoogleSigninBtn from "./components/GoogleSigninBtn.tsx"
import SignInPage from './pages/SignIn-Page/SignInPage';
import SignInErrorPage from "./pages/SigninError-Page/SignInErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
      <SignInPage />
      </div>
    ),
  },
  {
    path: "/passport",
    element: <Passport />,
  },
{
  path: "/sign-in-error",
  element: <SignInErrorPage />,
},
]);

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const handleClick = (): void => {
    setShowLogin(true);
  }

  return (
    <div>
      <GoogleSigninBtn onClick={handleClick} />
      {showLogin && <Login />}
      <RouterProvider router={router} />;
    </div>
  )
}
