// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport";
import Dashboard from './pages/Dashboard.tsx';
import Form from './pages/Form.tsx';
import SignInPage from './pages/SignInPage.tsx';
import SignInErrorPage from "./pages/SignInErrorPage.tsx";
// import GoogleSigninBtn from "@components/GoogleSigninBtn";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello World!</p>
        <Link to="passport">Other Page</Link>
        <Link to="passport">Dashboard</Link>
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
    path: "/dashboard/events",
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
      <RouterProvider router={router} />
    </div>
  )
}
