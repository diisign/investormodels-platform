
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LayoutDashboard, LogOut, Wallet, Plus, Minus } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/utils/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  
  const handleLogout = () => {
    if (onLogout) onLogout();
    else if (logout) logout();
    setIsUserMenuOpen(false);
  };

  const handleLogoClick = () => {
    closeMenu();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const userIsLoggedIn = isAuthenticated;
  
  // Get first letter of user's name or email for avatar fallback
  const getAvatarInitial = () => {
    if (!user) return '';
    
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-bold text-gradient"
          >
            CréatorInvest
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/creators" 
              className={cn(
                'font-medium transition-colors duration-300',
                isActive('/creators') 
                  ? 'text-investment-600 dark:text-investment-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-investment-500 dark:hover:text-investment-400'
              )}
            >
              Créatrices
            </Link>
            <Link 
              to="/how-it-works" 
              className={cn(
                'font-medium transition-colors duration-300',
                isActive('/how-it-works') 
                  ? 'text-investment-600 dark:text-investment-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-investment-500 dark:hover:text-investment-400'
              )}
            >
              Comment ça marche
            </Link>
            <Link 
              to="/faq" 
              className={cn(
                'font-medium transition-colors duration-300',
                isActive('/faq') 
                  ? 'text-investment-600 dark:text-investment-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-investment-500 dark:hover:text-investment-400'
              )}
            >
              Questions fréquentes
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userIsLoggedIn ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300 hover:text-investment-500 dark:hover:text-investment-400 transition-colors duration-300"
                  onClick={toggleUserMenu}
                >
                  <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                    <AvatarImage src={user?.avatar_url || ''} alt="Avatar" />
                    <AvatarFallback className="bg-investment-100 text-investment-600">
                      {getAvatarInitial()}
                    </AvatarFallback>
                  </Avatar>
                  <span>Mon compte</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 animate-scale-in origin-top-right"
                  >
                    <Link 
                      to="/dashboard" 
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      <span>Tableau de bord</span>
                    </Link>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span>Mon profil</span>
                    </Link>
                    <Link 
                      to="/deposit" 
                      className="flex items-center px-4 py-3 text-sm text-green-600 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Déposer des fonds</span>
                    </Link>
                    <button 
                      className="flex items-center w-full px-4 py-3 text-sm text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        window.location.href = '/profile?action=withdraw';
                      }}
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      <span>Retirer des fonds</span>
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <GradientButton 
                    variant="outline" 
                    size="default"
                    className="px-5"
                  >
                    Connexion
                  </GradientButton>
                </Link>
                <Link to="/register">
                  <GradientButton 
                    variant="primary" 
                    size="default"
                    className="px-5"
                  >
                    Inscription
                  </GradientButton>
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div 
          className={cn(
            'md:hidden absolute left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-out-expo',
            isOpen 
              ? 'top-full opacity-100 visible' 
              : 'top-[-400px] opacity-0 invisible'
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/creators" 
              className={cn(
                'block py-2 font-medium',
                isActive('/creators') 
                  ? 'text-investment-600 dark:text-investment-400' 
                  : 'text-gray-700 dark:text-gray-300'
              )}
              onClick={closeMenu}
            >
              Créatrices
            </Link>
            <Link 
              to="/how-it-works" 
              className={cn(
                'block py-2 font-medium',
                isActive('/how-it-works') 
                  ? 'text-investment-600 dark:text-investment-400' 
                  : 'text-gray-700 dark:text-gray-300'
              )}
              onClick={closeMenu}
            >
              Comment ça marche
            </Link>
            <Link 
              to="/faq" 
              className={cn(
                'block py-2 font-medium',
                isActive('/faq') 
                  ? 'text-investment-600 dark:text-investment-400' 
                  : 'text-gray-700 dark:text-gray-300'
              )}
              onClick={closeMenu}
            >
              Questions fréquentes
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              {userIsLoggedIn ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                      <AvatarImage src={user?.avatar_url || ''} alt="Avatar" />
                      <AvatarFallback className="bg-investment-100 text-investment-600">
                        {getAvatarInitial()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.name || user?.email}</span>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="block py-2 font-medium text-gray-700 dark:text-gray-300"
                    onClick={closeMenu}
                  >
                    Tableau de bord
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block py-2 font-medium text-gray-700 dark:text-gray-300"
                    onClick={closeMenu}
                  >
                    Mon profil
                  </Link>
                  <Link 
                    to="/deposit" 
                    className="block py-2 font-medium text-green-600 dark:text-green-400"
                    onClick={closeMenu}
                  >
                    Déposer des fonds
                  </Link>
                  <Link 
                    to="/profile?action=withdraw" 
                    className="block py-2 font-medium text-orange-600 dark:text-orange-400"
                    onClick={closeMenu}
                  >
                    Retirer des fonds
                  </Link>
                  <button 
                    className="block w-full text-left py-2 font-medium text-red-600 dark:text-red-400"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to="/login" onClick={closeMenu}>
                    <GradientButton
                      variant="outline"
                      fullWidth
                    >
                      Connexion
                    </GradientButton>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <GradientButton
                      variant="primary"
                      fullWidth
                    >
                      Inscription
                    </GradientButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
