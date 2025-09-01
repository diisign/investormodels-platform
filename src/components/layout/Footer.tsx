import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
const Footer: React.FC = () => {
  return <footer className="border-t border-border dark:border-border pt-16 pb-8 bg-inherit py-[106px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-8 mb-12">
          {/* Brand & About */}
          <div>
            <div className="mb-6">
              <Link to="/" className="flex items-center">
                <img src="/lovable-uploads/49b8cfb1-144c-4d61-b217-75a1ff327dc9.png" alt="Splitz" className="h-8" />
              </Link>
            </div>
            <p className="text-muted-foreground dark:text-muted-foreground mb-6 max-w-md">
              La première plateforme d'investissement dans les créatrices OnlyFans. 
              Investissez dans l'avenir du divertissement numérique avec transparence et sécurité.
            </p>
          </div>

          {/* Navigation and Legal side by side on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Navigation</h3>
              <ul className="space-y-3">
                 <li>
                   <Link to="/creators" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Créatrices
                   </Link>
                 </li>
                 <li>
                   <Link to="/about" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Qui sommes nous
                   </Link>
                 </li>
                 <li>
                   <Link to="/affiliation" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Programme d'affiliation
                   </Link>
                 </li>
                 <li>
                   <Link to="/faq" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     FAQ
                   </Link>
                 </li>
                 <li>
                   <Link to="/contact" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Contact
                   </Link>
                 </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Informations légales</h3>
              <ul className="space-y-3">
                 <li>
                   <Link to="/terms" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Conditions générales
                   </Link>
                 </li>
                 <li>
                   <Link to="/privacy" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Politique de confidentialité
                   </Link>
                 </li>
                 <li>
                   <Link to="/cookies" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Gestion des cookies
                   </Link>
                 </li>
                 <li>
                   <Link to="/legal" onClick={scrollToTop} className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                     Mentions légales
                   </Link>
                 </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border dark:border-border text-center sm:text-left sm:flex sm:justify-between sm:items-center">
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Splitz. Tous droits réservés.
          </p>
          <div className="mt-4 sm:mt-0">
            <p className="text-muted-foreground dark:text-muted-foreground text-xs">
              Plateforme d'investissement régulée et sécurisée
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;