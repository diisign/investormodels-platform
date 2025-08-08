import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieChoice = localStorage.getItem('cookie-consent');
    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleRefuseAll = () => {
    localStorage.setItem('cookie-consent', 'refused');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icône et texte */}
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-yellow-300 rounded-full p-2 flex-shrink-0 mt-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-black">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground dark:text-foreground mb-2">
                ROYALTIZ UTILISE DES COOKIES SUR CE SITE WEB
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                Avec votre consentement, nous les utilisons pour mesurer et analyser l'utilisation du 
                site Web afin d'améliorer l'expérience et enregistrer les paramètres de préférence. En 
                savoir plus sur notre{' '}
                <Link to="/privacy" className="text-yellow-300 hover:text-yellow-400 underline">
                  politique de confidentialité
                </Link>
              </p>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleRefuseAll}
              className="border-border text-foreground hover:bg-muted"
            >
              Refuser tous les cookies
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Accepter tous les cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;