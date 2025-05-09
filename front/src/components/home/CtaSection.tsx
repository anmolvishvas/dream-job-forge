
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Building2 } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dream-600 to-teal-600 opacity-90 -z-10" />
      
      {/* Abstract shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Prêt à transformer votre carrière ou à trouver les meilleurs talents?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Rejoignez notre communauté de professionnels et d'entreprises pour découvrir des opportunités uniques et bâtir votre avenir.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register?role=candidate">
              <Button size="lg" className="bg-white text-dream-600 hover:bg-white/90 w-full sm:w-auto">
                <UserPlus className="mr-2 h-5 w-5" />
                Créer un compte candidat
              </Button>
            </Link>
            <Link to="/register?role=recruiter">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                <Building2 className="mr-2 h-5 w-5" />
                Publier une offre d'emploi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
