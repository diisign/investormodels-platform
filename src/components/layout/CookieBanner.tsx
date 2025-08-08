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
            <div className="flex-shrink-0 mt-1">
              <span className="text-2xl">🍪</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground dark:text-foreground mb-2">
                SPLITZ UTILISE DES COOKIES SUR CE SITE WEB
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                Avec votre consentement, nous les utilisons pour mesurer et analyser l'utilisation du 
                site Web afin d'améliorer l'expérience et enregistrer les paramètres de préférence. En 
                savoir plus sur notre politique de confidentialité
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
              className="bg-yellow-300 hover:bg-yellow-400 text-black"
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