import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { login as mockLogin, register as mockRegister, logout as mockLogout, getCurrentUser, User, isAuthenticated as mockIsAuthenticated } from './mockData';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const loggedUser = await mockLogin(email, password);
      setUser(loggedUser);
      setIsAuthenticated(true);
      toast.success("Connexion réussie");
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : "Échec de la connexion");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      setIsLoading(true);
      const newUser = await mockRegister(email, name, password);
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success("Inscription réussie");
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error instanceof Error ? error.message : "Échec de l'inscription");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await mockLogout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Déconnexion réussie");
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Erreur lors de la déconnexion");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout
  };
};

// Route protection
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-investment-500">
          Chargement...
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
