import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
const Footer: React.FC = () => {
  return <footer className="border-t border-border dark:border-border pt-16 pb-8 bg-inherit py-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & About */}
          

          {/* Navigation */}
          

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground dark:text-foreground mb-4 py-0">Informations légales</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300">
                  Gestion des cookies
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-creator-500 mr-2 mt-0.5" />
                <a href="mailto:creatorinvest@outlook.fr" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300">
                  creatorinvest@outlook.fr
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300 flex items-center">
                  <span>Formulaire de contact</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground dark:text-muted-foreground hover:text-creator-500 dark:hover:text-creator-400 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border dark:border-border text-center sm:text-left sm:flex sm:justify-between sm:items-center">
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CréatorInvest. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;