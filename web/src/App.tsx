// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from '@pages/SignInPage';
import SignInErrorPage from "@pages/SignInErrorPage";
import AdminLogin from "@pages/Admin-Login";
import Dashboard from "@pages/Dashboard";
import Form from "@pages/Form";
// import GoogleSigninBtn from "@components/GoogleSigninBtn";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello World!</p>
        <Link to="passport">Other Page</Link>
        <br />
        <Link to="dashboard">Admin Login</Link>
        <br />
        <Link to="dashboard/events">Admin Dashboard</Link>
        <br />
        <Link to="form">Form</Link>
      </div>
    ),
  },
  {
    path: "/passport",
    element: <Passport />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
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
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/form",
    element: <Form />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
