import { Home } from '@/screens';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
