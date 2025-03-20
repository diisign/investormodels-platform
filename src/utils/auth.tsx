
import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from '../integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

// Define a Transaction type to use with type assertions
type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  type?: string;
  description?: string;
  date?: string;
};

type User = {
  id: string;
  email: string;
  name?: string;
  balance?: number;
  investments?: any[];
  transactions?: Transaction[];
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

  // Fonction pour récupérer les données utilisateur complètes
  const fetchUserData = async (userId: string) => {
    try {
      // Récupérer les transactions de l'utilisateur
      // Use a direct query with type casting to avoid TypeScript errors
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId) as any;
      
      if (transactionsError) throw transactionsError;
      
      // Calculer le solde total
      const balance = transactionsData ? transactionsData.reduce((sum: number, transaction: any) => sum + Number(transaction.amount || 0), 0) : 0;
      
      // Pour l'instant, on utilise des tableaux vides pour les investissements
      // Dans une implémentation réelle, vous récupéreriez ces données depuis Supabase
      const investments: any[] = [];
      
      return {
        balance,
        investments,
        transactions: transactionsData as Transaction[]
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return {
        balance: 0,
        investments: [],
        transactions: []
      };
    }
  };

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
