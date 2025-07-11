
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Lock, Mail, User } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/auth';
import { processReferralSignup, getReferralCodeFromUrl } from '@/utils/referrals';
import { supabase } from '@/integrations/supabase/client';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });
  
  // Check for referral code in URL on component mount
  React.useEffect(() => {
    const refCode = getReferralCodeFromUrl();
    if (refCode) {
      setReferralCode(refCode);
    }
  }, []);
  
  const { register, isLoading } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }

    // Validate terms
    if (!agreeTerms) {
      newErrors.terms = 'Vous devez accepter les conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register form submitted');
    
    if (validateForm()) {
      try {
        console.log('Attempting registration with form validation passed');
        // Updated to match the function signature in auth.tsx
        const success = await register(email, password, name);
        
        // If registration successful and there's a referral code, process it
        if (success && referralCode) {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              await processReferralSignup(user.id, referralCode);
              console.log('Referral processed successfully');
            }
          } catch (referralError) {
            console.error('Error processing referral:', referralError);
            // Don't fail the registration for referral errors
          }
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow pt-20">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <FadeIn direction="up" className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Rejoignez notre plateforme et commencez à investir dans les créateurs
                </p>
              </FadeIn>
              
              <FadeIn direction="up" delay={100}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom complet
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={cn(
                            "input-field pl-10",
                            errors.name && "border-red-300 focus:border-red-300 focus:ring-red-200"
                          )}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    
                    {/* Email field */}
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
                    
                    {/* Password field */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mot de passe
                      </label>
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
                    
                    {/* Confirm Password field */}
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={cn(
                            "input-field pl-10",
                            errors.confirmPassword && "border-red-300 focus:border-red-300 focus:ring-red-200"
                          )}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    
                    {/* Terms checkbox */}
                    <div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-investment-600 focus:ring-investment-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="text-gray-600 dark:text-gray-300">
                            J'accepte les <Link to="/terms" className="text-investment-600 hover:text-investment-500">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-investment-600 hover:text-investment-500">politique de confidentialité</Link>
                          </label>
                        </div>
                      </div>
                      {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms}</p>}
                    </div>
                    
                    {/* Submit button - Fixing nesting button warning */}
                    <div>
                      <GradientButton
                        type="submit"
                        fullWidth
                        size="lg"
                        disabled={isLoading}
                        className="from-teal-400 to-blue-500 text-white mt-2"
                      >
                        <span className="flex items-center justify-center">
                          {isLoading ? 'Création du compte...' : 'Créer un compte'}
                          {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                        </span>
                      </GradientButton>
                    </div>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Vous avez déjà un compte?{' '}
                      <Link to="/login" className="text-investment-600 hover:text-investment-500 font-medium">
                        Connexion
                      </Link>
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  En créant un compte, vous acceptez de recevoir des emails de notre part. Vous pouvez vous désabonner à tout moment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
