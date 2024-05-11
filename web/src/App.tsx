// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from './pages/SignInPage';
import SignInErrorPage from "./pages/SignInErrorPage";
import AdminLogin from "./pages/Admin-Login";
import Dashboard from "@pages/Dashboard";
import Form from "@pages/Form";
import PrivacyPolicy from "@pages/privacy-policy";
import QRErrorPage from "@pages/QrErrorPage";
import { HomePage } from "@pages/Landing-Page"
import CongratsPage from "./pages/LeaderboardCongratsPage.tsx";
import Leaderboard from "@pages/Leaderboard"
import LeaderboardPrize from "@pages/LeaderboardCongratsPage"
import QRErrorPage from "@pages/QrErrorPage";
// import GoogleSigninBtn from "@components/GoogleSigninBtn";

const router = createBrowserRouter([
  {
    //landing page
    path: "/",
    element: (
      <div>
      {/* change to landing */}
      <SignInPage />
      </div>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <div>
      <SignInPage />
      </div>
    ),
  },
  {
    path: "/sign-in/:id", //using this to testing qr code functionality
    element: (
      <div>
      <SignInPage />
      </div>
    ),
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/:id", //using this to testing qr code functionality
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
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/leaderboard-prize",
    element: <LeaderboardPrize />,
  },
  {
    path: "/dashboard",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard/prizes",
    element: <DashboardPrizes />,
  },
  {
    path: "/dashboard/events",
    element: <Events />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
{
  path: "/qr-error",
  element: <QRErrorPage />,
},
{
  path: "/leaderboard-prize",
  element: <CongratsPage />,
}
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
