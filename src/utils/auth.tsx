import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase, getSupabaseUrl } from '../integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

type User = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
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
  register: (email: string, password: string, name: string) => Promise<boolean>;
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
    console.log('AuthProvider: Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event, newSession);
        setSession(newSession);
        
        if (newSession?.user) {
          console.log('User is authenticated:', newSession.user.email);
          
          const userData: User = {
            id: newSession.user.id,
            email: newSession.user.email || '',
            name: newSession.user.user_metadata?.name,
            balance: 1000,
            transactions: [],
            investments: []
          };
          
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', newSession.user.id)
                .maybeSingle();
                
              if (profileData && !error) {
                userData.avatar_url = profileData.avatar_url;
                setUser({ ...userData });
              } else if (error) {
                console.error('Error fetching profile:', error);
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
            }
          }, 0);
          
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('User is not authenticated');
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Got existing session:', currentSession);
      setSession(currentSession);
      
      if (currentSession?.user) {
        console.log('Existing user found:', currentSession.user.email);
        
        const userData: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          name: currentSession.user.user_metadata?.name,
          balance: 1000,
          transactions: [],
          investments: []
        };
        
        setTimeout(async () => {
          try {
            const { data: profileData, error } = await supabase
              .from('profiles')
              .select('avatar_url')
              .eq('id', currentSession.user.id)
              .maybeSingle();
              
            if (profileData && !error) {
              userData.avatar_url = profileData.avatar_url;
              setUser({ ...userData });
            } else if (error) {
              console.error('Error fetching profile:', error);
            }
          } catch (error) {
            console.error('Error in profile fetch:', error);
          }
        }, 0);
        
        setUser(userData);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with:', email);
      setIsLoading(true);
      
      console.log('Using Supabase URL:', getSupabaseUrl());
      console.log('Attempting to login with Supabase');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error(error.message || "Échec de la connexion");
        return false;
      }

      console.log('Login successful:', data);
      toast.success("Connexion réussie");
      
      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
          balance: 1000,
          transactions: [],
          investments: []
        };
        setUser(userData);
      }
      
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error(error instanceof Error ? error.message : "Échec de la connexion");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
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
        toast.error(error.message || "Échec de l'inscription");
        return false;
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
