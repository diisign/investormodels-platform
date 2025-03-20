
// This is now just a barrel file to export all auth-related functionality
export { AuthProvider } from './AuthContext';
export { useAuth } from './useAuth';
export { RequireAuth } from './RequireAuth';
export type { User, Transaction, AuthContextType } from './authTypes';
