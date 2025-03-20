
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User, AuthContextType } from './authTypes';
import { fetchUserData } from './userDataService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Configurer l'écouteur de changement d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
          };
          
          // Récupérer les données supplémentaires de l'utilisateur
          const additionalData = await fetchUserData(session.user.id);
          setUser({ ...userData, ...additionalData });
          setIsAuthenticated(true);
          
          // Rediriger vers l'accueil/dashboard si sur la page de login
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/register') {
            navigate('/dashboard');
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      }
    );

    // Vérifier la session existante
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name,
        };
        
        // Récupérer les données supplémentaires de l'utilisateur
        const additionalData = await fetchUserData(session.user.id);
        setUser({ ...userData, ...additionalData });
        setIsAuthenticated(true);
        
        // Rediriger vers l'accueil/dashboard si sur la page de login
        const currentPath = window.location.pathname;
        if (currentPath === '/login' || currentPath === '/register') {
          navigate('/dashboard');
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Connexion réussie");
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error(error instanceof Error ? error.message : "Échec de la connexion");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
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

      if (error) throw error;

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
