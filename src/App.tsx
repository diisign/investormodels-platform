
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
import HowItWorks from "./pages/HowItWorks";

import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Legal from "./pages/Legal";
import Examples from "./pages/Examples";
import Dɑshboard from "./pages/dɑshboard";
import Dɑshboɑrd from "./pages/dɑshboɑrd";
import Dashboɑrd from "./pages/dashboɑrd";
import DashboardAffiliation from "./pages/DashboardAffiliation";
import CreatorApplication from "./pages/CreatorApplication";
import AdminApplications from "./pages/AdminApplications";
import CookieBanner from "./components/layout/CookieBanner";

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
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about-us" element={<AboutUs />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/creator-application" element={<CreatorApplication />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/dɑshboard" element={<Dɑshboard />} />
            <Route path="/dɑshboɑrd" element={<Dɑshboɑrd />} />
            <Route path="/dashboɑrd" element={<Dashboɑrd />} />
            
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
            
            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            
            <Route path="/deposit" element={
              <RequireAuth>
                <Deposit />
              </RequireAuth>
            } />
            
            <Route path="/dashboard-affiliation" element={
              <RequireAuth>
                <DashboardAffiliation />
              </RequireAuth>
            } />
            
            <Route path="/admin/applications" element={
              <RequireAuth>
                <AdminApplications />
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
            
            {/* Route explicite pour 404 */}
            <Route path="/404" element={<NotFound />} />
            
            {/* Route par défaut */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
