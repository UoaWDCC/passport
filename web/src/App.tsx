import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import Home from '@pages/Home';

const router = createBrowserRouter([
  {
    path: '/:name',
    element: <Home />,
  },
]);

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
