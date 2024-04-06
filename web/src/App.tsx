// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport";
import GoogleSigninBtn from './components/GoogleSigninBtn.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Form from './pages/Form.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello World!</p>
        <Link to="passport">Other Page</Link>
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
]);

export default function App() {
  const handleClick = (): void => {
    console.log('Custom Button was clicked!');
  };
  
  return (
    <div>
      <GoogleSigninBtn onClick={handleClick} />
      <RouterProvider router={router} />;
    </div>
  );
}
