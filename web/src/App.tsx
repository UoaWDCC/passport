// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";

import Passport from "@pages/Passport";
import Dashboard from './pages/Dashboard.tsx';
import Form from './pages/Form.tsx';
import SignInPage from './pages/SignInPage.tsx';
import SignInErrorPage from "./pages/SignInErrorPage.tsx";
import AdminLogin from "./pages/Admin-Login";
import CongratsPage from "./pages/LeaderboardCongratsPage.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";

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
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/sign-in-error",
    element: <SignInErrorPage />,
  },
  {
    path: "/dashboard",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard/events",
    element: <Dashboard />,
  },
  {
    path: "/leaderboard-prize",
    element: <CongratsPage />,
  },
  {
    path: "/form",
    element: <Form />,
  }
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
