import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './routes/AuthContext.tsx';
import HomePage from './routes/HomePage.tsx';
import InfoPage from './routes/InfoPage.tsx';
import LoginPage from './routes/LoginPage.tsx';
import RegisterPage from './routes/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { 
        path: "pokemon/:id",
        element: <InfoPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

