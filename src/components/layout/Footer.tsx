import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
const Footer: React.FC = () => {
  return <footer className="border-t border-border dark:border-border pt-16 pb-8 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & About */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link to="/" className="text-2xl font-bold text-foreground dark:text-foreground">
                <span className="text-yellow-300">Créator</span>Invest
              </Link>
            </div>
            <p className="text-muted-foreground dark:text-muted-foreground mb-6 max-w-md">
              La première plateforme d'investissement dans les créatrices OnlyFans. 
              Investissez dans l'avenir du divertissement numérique avec transparence et sécurité.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground dark:text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/creators" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Créatrices
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/affiliation" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Programme d'affiliation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
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
                <Link to="/terms" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Gestion des cookies
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-muted-foreground dark:text-muted-foreground hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors duration-300">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <div className="text-center">
            <h3 className="font-semibold text-foreground dark:text-foreground mb-2">
              Une question ? Contactez-nous
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground mb-4">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:contact@creatorinvest.com" 
                className="flex items-center text-yellow-300 hover:text-yellow-400 transition-colors duration-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                contact@creatorinvest.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-border dark:border-border text-center sm:text-left sm:flex sm:justify-between sm:items-center">
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CréatorInvest. Tous droits réservés.
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