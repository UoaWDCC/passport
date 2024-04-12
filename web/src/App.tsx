// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
      <SignInPage />
      </div>
    ),
  },
  {
    path: "/passport",
    element: <Passport />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/form",
    element: <Form />,
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
