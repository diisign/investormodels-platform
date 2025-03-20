
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

// Define a Transaction type to use with type assertions
export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  type?: string;
  description?: string;
  date?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  balance?: number;
  investments?: any[];
  transactions?: Transaction[];
}

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};
