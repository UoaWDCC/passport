// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "@pages/Login"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
// import { useState } from 'react';
// import Home from "@pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello World!</p>
        <Link to="newpage">Other Page</Link>
        <div>
          <Link to="temp-login">Login</Link>
        </div>
      </div>
    ),
  },
  {
    path: "/newpage",
    element: <p>Insert element here</p>,
  },
  {
    path: "/temp-login",
    element: <Login />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
