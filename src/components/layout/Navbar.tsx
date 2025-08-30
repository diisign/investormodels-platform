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
const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    logout,
    isAuthenticated,
    user
  } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const handleLogout = () => {
    if (onLogout) onLogout();else if (logout) logout();
    setIsUserMenuOpen(false);
  };
  const handleLogoClick = () => {
    closeMenu();
    navigate('/', {
      replace: true
    });
    // Scroll vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
  const getAvatarInitial = () => {
    if (!user) return '';
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };
  return <nav className={cn('fixed left-0 right-0 z-50 transition-all duration-300 py-4', 'top-[38px]', isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent')}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-0 my-[6px]">
          <button onClick={handleLogoClick} className="flex items-center">
            <img src="/lovable-uploads/3d2823d0-03f5-4650-92e6-39d1c77529a2.png" alt="SPLITZ" className="h-5 w-auto" />
          </button>

          <button className="text-gray-700 dark:text-gray-300 focus:outline-none" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className={cn('absolute left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-out-expo z-50', isOpen ? 'top-full opacity-100 visible' : 'top-[-400px] opacity-0 invisible')}>
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/about-us" className={cn('block py-2 font-medium', isActive('/about-us') ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300')} onClick={closeMenu}>
              Qui sommes-nous?
            </Link>
            <Link to="/creators" className={cn('block py-2 font-medium', isActive('/creators') ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300')} onClick={closeMenu}>
              Créatrices
            </Link>
            <Link to="/affiliation" className={cn('block py-2 font-medium', isActive('/affiliation') ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300')} onClick={closeMenu}>
              Affiliation
            </Link>
            <Link to="/dashboard" className={cn('block py-2 font-medium', isActive('/dashboard') ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300')} onClick={closeMenu}>
              Tableau de bord
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              {userIsLoggedIn ? <>
                  <div className="flex items-center space-x-3 py-2">
                    <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                      <AvatarImage src={user?.avatar_url || ''} alt="Avatar" />
                      <AvatarFallback className="bg-investment-100 text-investment-600">
                        {getAvatarInitial()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.name || user?.email}</span>
                  </div>
                  <Link to="/profile" className="block py-2 font-medium text-gray-700 dark:text-gray-300" onClick={closeMenu}>
                    Mon profil
                  </Link>
                  <Link to="/deposit" className="block py-2 font-medium text-primary" onClick={closeMenu}>
                    Déposer des fonds
                  </Link>
                  <Link to="/profile?action=withdraw" className="block py-2 font-medium text-orange-600 dark:text-orange-400" onClick={closeMenu}>
                    Retirer des fonds
                  </Link>
                  <button className="block w-full text-left py-2 font-medium text-red-600 dark:text-red-400" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </> : <div className="flex flex-col space-y-3">
                  <Link to="/login" onClick={closeMenu}>
                    <GradientButton variant="secondary" fullWidth>
                      Connexion
                    </GradientButton>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <GradientButton variant="primary" fullWidth>
                      Inscription
                    </GradientButton>
                  </Link>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;