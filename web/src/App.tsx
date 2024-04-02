// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";
// the intersection. 
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <p>Hello World!</p>
        <Link to="newpage">Other Page</Link>
      </div>
    ),
  },
  {
    path: "/newpage",
    element: <p>Insert element here</p>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}


