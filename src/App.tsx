
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Index as Home } from "./pages/Index"; // Renommé pour utiliser le composant existant
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import WebhookDebug from "./pages/WebhookDebug";
import StripeData from "./pages/StripeData";
import { AuthProvider } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute"; // Nous allons créer ce composant

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/deposit",
    element: (
      <ProtectedRoute>
        <Deposit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/webhook-debug",
    element: (
      <ProtectedRoute>
        <WebhookDebug />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stripe-data",
    element: <StripeData />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
