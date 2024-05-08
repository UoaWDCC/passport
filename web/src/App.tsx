// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from './pages/SignInPage';
import SignInErrorPage from "./pages/SignInErrorPage";
import AdminLogin from "./pages/Admin-Login";
import Dashboard from "@pages/Dashboard";
import Form from "@pages/Form";
import CongratsPage from "./pages/LeaderboardCongratsPage.tsx";
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
  path: "/dashboard",
  element: <AdminLogin />,
},
{
  path: "/dashboard/events",
  element: <Dashboard />,
},
{
  path: "/form",
  element: <Form />,
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
