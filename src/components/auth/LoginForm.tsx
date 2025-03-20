
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/auth';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  
  const { login, isLoading } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging log
    
    if (validateForm()) {
      try {
        console.log("Attempting login with:", email, password);
        const success = await login(email, password);
        console.log("Login result:", success); // Debugging log
        
        if (!success) {
          setErrors({
            ...errors,
            general: 'Identifiants incorrects'
          });
          toast.error("Échec de la connexion");
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          ...errors,
          general: 'Identifiants incorrects'
        });
        toast.error("Échec de la connexion");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Adresse email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "input-field pl-10",
                errors.email && "border-red-300 focus:border-red-300 focus:ring-red-200"
              )}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mot de passe
            </label>
            <Link to="/forgot-password" className="text-sm text-investment-600 hover:text-investment-500">
              Mot de passe oublié?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "input-field pl-10 pr-10",
                errors.password && "border-red-300 focus:border-red-300 focus:ring-red-200"
              )}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
        
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-investment-600 focus:ring-investment-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
            Se souvenir de moi
          </label>
        </div>
        
        <div>
          <GradientButton
            type="submit"
            fullWidth
            size="lg"
            disabled={isLoading}
            icon={<LogIn className="h-5 w-5" />}
            iconPosition="right"
            className="mt-2"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </GradientButton>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Vous n'avez pas de compte?{' '}
          <Link to="/register" className="text-investment-600 hover:text-investment-500 font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
