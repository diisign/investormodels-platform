
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check if this is a direct access (i.e., refreshed page or direct URL entry)
    const directAccess = performance.navigation?.type === 1 || document.referrer === "";
    
    // If the route exists in our router but was accessed directly, we should navigate to it
    if (directAccess && location.pathname !== "/404") {
      const availableRoutes = [
        "/", "/login", "/register", "/dashboard", "/profile", "/affiliation", 
        "/faq", "/contact", "/creators", "/examples", "/exemples2", "/terms",
        "/privacy", "/cookies", "/legal", "/dashboard-affiliation", "/webhook-debug"
      ];
      
      if (availableRoutes.includes(location.pathname)) {
        // Wait a bit before redirecting to ensure component is fully mounted
        const timer = setTimeout(() => {
          navigate(location.pathname, { replace: true });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FadeIn direction="up">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">404</h1>
          <h2 className="text-xl font-medium mb-4 text-gray-800">Page introuvable</h2>
          <p className="text-gray-600 mb-6">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/">
            <Button variant="default" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
};

export default NotFound;
