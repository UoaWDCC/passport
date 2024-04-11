// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from "./pages/SignIn-Page/SignInPage"
import SignInErrorPage from "./pages/SigninError-Page/SignInErrorPage"
import DashboardPrizes from "@pages/DashboardPrizes"
// import GoogleSigninBtn from "@components/GoogleSigninBtn";

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
  {
    path: "/dashboard/prizes",
    element: <DashboardPrizes />,
  },
])

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  )
}
