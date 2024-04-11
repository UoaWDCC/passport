// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from './pages/SignIn-Page/SignInPage';
import SignInErrorPage from "./pages/SigninError-Page/SignInErrorPage";
import GoogleSigninBtn from "@components/GoogleSigninBtn";

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
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  )
}
