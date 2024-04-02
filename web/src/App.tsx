// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState } from 'react';
// import Home from "@pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Hello World!</p>,
  },
  {
    path: "/newpage",
    element: <p>Insert element here</p>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
