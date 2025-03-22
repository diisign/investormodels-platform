
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import WebhookDebug from "./pages/WebhookDebug";
import StripeData from "./pages/StripeData";
import { AuthProvider } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a Root component that wraps routes with AuthProvider
const AppRoot = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot><Index /></AppRoot>,
  },
  {
    path: "/login",
    element: <AppRoot><Login /></AppRoot>,
  },
  {
    path: "/register",
    element: <AppRoot><Register /></AppRoot>,
  },
  {
    path: "/dashboard",
    element: (
      <AppRoot>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AppRoot>
    ),
  },
  {
    path: "/deposit",
    element: (
      <AppRoot>
        <ProtectedRoute>
          <Deposit />
        </ProtectedRoute>
      </AppRoot>
    ),
  },
  {
    path: "/webhook-debug",
    element: (
      <AppRoot>
        <ProtectedRoute>
          <WebhookDebug />
        </ProtectedRoute>
      </AppRoot>
    ),
  },
  {
    path: "/stripe-data",
    element: <AppRoot><StripeData /></AppRoot>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
