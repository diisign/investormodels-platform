
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from '../integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

type User = {
  id: string;
  email: string;
  name?: string;
  // Propriétés temporaires pour éviter les erreurs TypeScript
  balance?: number;
  transactions?: any[];
  investments?: any[];
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Set up auth state listener FIRST with more verbose logging
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, newSession) => {
          console.log('Auth state changed:', event, newSession);
          setSession(newSession);
          
          if (newSession?.user) {
            const userData: User = {
              id: newSession.user.id,
              email: newSession.user.email || '',
              name: newSession.user.user_metadata?.name,
              // Ajouter des valeurs par défaut pour les propriétés manquantes
              balance: 1000, // Valeur temporaire
              transactions: [],
              investments: []
            };
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
          
          setIsLoading(false);
        }
      );

      // THEN check for existing session with more verbose logging
      supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
        console.log('Got existing session:', currentSession);
        setSession(currentSession);
        
        if (currentSession?.user) {
          const userData: User = {
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name: currentSession.user.user_metadata?.name,
            // Ajouter des valeurs par défaut pour les propriétés manquantes
            balance: 1000, // Valeur temporaire
            transactions: [],
            investments: []
          };
          setUser(userData);
          setIsAuthenticated(true);
        }
        
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error in AuthProvider setup:', error);
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with:', email);
      setIsLoading(true);
      
      // Vérifier la configuration sans accéder aux propriétés protégées
      console.log('Attempting to login with Supabase');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        
        // Check for specific error types
        if (error.message.includes('Email logins are disabled')) {
          toast.error("Les connexions par email sont désactivées. Veuillez activer l'authentification par email dans la console Supabase.");
          return false;
        }
        
        throw error;
      }

      console.log('Login successful:', data);
      toast.success("Connexion réussie");
      
      // Important: Use a slight delay to ensure auth state is properly updated before redirect
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 100);
      
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error(error instanceof Error ? error.message : "Échec de la connexion");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting registration with:', email, name);
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('Registration error:', error);
        
        // Check for specific error types
        if (error.message.includes('Email signups are disabled')) {
          toast.error("Les inscriptions par email sont désactivées. Veuillez activer l'authentification par email dans la console Supabase.");
          return false;
        }
        
        throw error;
      }

      console.log('Registration successful:', data);
      toast.success("Inscription réussie");
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      toast.error(error instanceof Error ? error.message : "Échec de l'inscription");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout');
      setIsLoading(true);
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      navigate('/');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      toast.error("Erreur lors de la déconnexion");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Protection des routes
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('RequireAuth: Not authenticated, redirecting to login');
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
