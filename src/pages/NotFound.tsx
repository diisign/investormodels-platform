
import { useLocation, useNavigate } from "react-router-dom";
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
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FadeIn direction="up">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">404</h1>
          <h2 className="text-xl font-medium mb-4 text-gray-800">Page introuvable</h2>
          <p className="text-gray-600 mb-6">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Button 
            variant="default" 
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default NotFound;
