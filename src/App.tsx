
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";
import CreatorDetails from "./pages/CreatorDetails";
import Affiliation from "./pages/Affiliation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthProvider, RequireAuth } from "./utils/auth";
import Deposit from "./pages/Deposit";
import Profile from "./pages/Profile";
import WebhookDebug from "./pages/WebhookDebug";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Legal from "./pages/Legal";
import Examples from "./pages/Examples";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/affiliation" element={<Affiliation />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/examples" element={<Examples />} />
            
            {/* Legal Pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/legal" element={<Legal />} />
            
            {/* Routes protégées */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            
            <Route path="/deposit" element={
              <RequireAuth>
                <Deposit />
              </RequireAuth>
            } />
            
            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            
            {/* Routes pour le débogage */}
            <Route path="/webhook-debug" element={
              <RequireAuth>
                <WebhookDebug />
              </RequireAuth>
            } />
            
            {/* Routes des créateurs */}
            <Route path="/creators" element={<Creators />} />
            <Route path="/creator/:creatorId" element={<CreatorDetails />} />
            
            {/* Route par défaut */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
