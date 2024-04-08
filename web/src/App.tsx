// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport"
import SignInPage from './pages/SignIn-Page/SignInPage';
import SignInErrorPage from "./pages/SigninError-Page/SignInErrorPage";
import AdminLogin from "./pages/Admin-Login";
import Dashboard from './pages/Dashboard.tsx';
import Form from './pages/Form.tsx';
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
