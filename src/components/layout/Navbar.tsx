
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X, ChevronDown, Home, Info, CreditCard, Users, HelpCircle, User, LogOut, LayoutDashboard, Gift, Bug } from 'lucide-react';
import { useAuth } from '@/utils/auth';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-teal-500">CreatorFund</span>
          <Badge variant="outline" className="ml-2">Beta</Badge>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={location.pathname === '/'}>
            <Home className="h-4 w-4 mr-1" />
            Accueil
          </NavLink>
          <NavLink to="/creators" active={location.pathname.includes('/creators')}>
            <Users className="h-4 w-4 mr-1" />
            Créateurs
          </NavLink>
          <NavLink to="/how-it-works" active={location.pathname === '/how-it-works'}>
            <HelpCircle className="h-4 w-4 mr-1" />
            Comment ça marche
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about'}>
            <Info className="h-4 w-4 mr-1" />
            À propos
          </NavLink>
          
          {isLoggedIn ? (
            <div className="relative group">
              <Button variant="ghost" className="flex items-center gap-1" asChild>
                <span>
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Mon compte</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </span>
              </Button>
              
              <div className="absolute right-0 mt-2 w-48 py-2 bg-background rounded-md shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-accent flex items-center">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Tableau de bord
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </Link>
                <Link to="/deposit" className="block px-4 py-2 text-sm hover:bg-accent flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Déposer des fonds
                </Link>
                <Link to="/webhook-debug" className="block px-4 py-2 text-sm hover:bg-accent flex items-center">
                  <Bug className="h-4 w-4 mr-2" />
                  Webhook Debug
                </Link>
                <button 
                  onClick={() => logout()} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-accent flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Inscription</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
      
      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-4 border-t">
          <div className="container mx-auto px-4 space-y-2">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-5 w-5 mr-2" />
              Accueil
            </MobileNavLink>
            <MobileNavLink to="/creators" onClick={() => setIsMenuOpen(false)}>
              <Users className="h-5 w-5 mr-2" />
              Créateurs
            </MobileNavLink>
            <MobileNavLink to="/how-it-works" onClick={() => setIsMenuOpen(false)}>
              <HelpCircle className="h-5 w-5 mr-2" />
              Comment ça marche
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              <Info className="h-5 w-5 mr-2" />
              À propos
            </MobileNavLink>
            
            {isLoggedIn ? (
              <>
                <div className="w-full h-px bg-border my-2"></div>
                <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Tableau de bord
                </MobileNavLink>
                <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-5 w-5 mr-2" />
                  Profil
                </MobileNavLink>
                <MobileNavLink to="/deposit" onClick={() => setIsMenuOpen(false)}>
                  <Gift className="h-5 w-5 mr-2" />
                  Déposer des fonds
                </MobileNavLink>
                <MobileNavLink to="/webhook-debug" onClick={() => setIsMenuOpen(false)}>
                  <Bug className="h-5 w-5 mr-2" />
                  Webhook Debug
                </MobileNavLink>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full flex items-center text-left px-4 py-2 text-red-500 rounded-md hover:bg-accent"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild className="w-full justify-center">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                </Button>
                <Button asChild className="w-full justify-center">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Inscription</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop NavLink component
const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center hover:bg-accent transition-colors ${
      active ? 'bg-accent' : ''
    }`}
  >
    {children}
  </Link>
);

// Mobile NavLink component 
const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-2 rounded-md hover:bg-accent"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
