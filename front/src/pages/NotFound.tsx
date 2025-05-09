
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="bg-muted rounded-full p-6 mb-6">
            <FileQuestion className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Page non trouvée</h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            La page que vous recherchez semble introuvable ou a été déplacée.
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                Retour à l'accueil
              </Button>
            </Link>
            
            <div className="flex justify-center space-x-6 pt-4">
              <Link to="/jobs" className="text-primary hover:underline">
                Voir les offres d'emploi
              </Link>
              <Link to="/contact" className="text-primary hover:underline">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
