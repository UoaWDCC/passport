// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";
import Passport from "@pages/Passport";

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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
