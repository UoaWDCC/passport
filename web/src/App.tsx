// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from "./pages/SignInPage"
import SignInErrorPage from "./pages/SignInErrorPage"
import AdminLogin from "./pages/Admin-Login"
//import Dashboard from "@pages/Dashboard"
import DashboardPrizes from "@pages/DashboardPrizes"
import Events from "@pages/Events.tsx";
import Form from "@pages/Form"
import PrivacyPolicy from "@pages/privacy-policy";
import { HomePage } from "@pages/Landing-Page"
import Leaderboard from "@pages/Leaderboard"
import LeaderboardPrize from "@pages/LeaderboardCongratsPage"
// import GoogleSigninBtn from "@components/GoogleSigninBtn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
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
  }
]);

export default function App() {
    return (
        <div>
            <RouterProvider router={router} />;
        </div>
    );
}
