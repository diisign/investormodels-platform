
import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from './utils/auth';

const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Creators = lazy(() => import('./pages/Creators'));
const CreatorDetails = lazy(() => import('./pages/CreatorDetails'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Deposit = lazy(() => import('./pages/Deposit'));
const WebhookDebug = lazy(() => import('./pages/WebhookDebug'));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creators/:id" element={<CreatorDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/webhook-debug" element={<WebhookDebug />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
