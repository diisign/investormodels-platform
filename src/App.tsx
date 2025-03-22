
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import WebhookDebug from "./pages/WebhookDebug";
import StripeData from "./pages/StripeData";
import Creators from "./pages/Creators";
import CreatorDetails from "./pages/CreatorDetails";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./utils/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
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
  {
    path: "/creators",
    element: <Creators />,
  },
  {
    path: "/creators/:id",
    element: <CreatorDetails />,
  },
  {
    // Catch-all route for 404 pages
    path: "*",
    element: <NotFound />,
  },
]);

// We need to modify how AuthProvider is used to avoid the Router context error
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
