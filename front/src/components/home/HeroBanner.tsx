
import { Search, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-dream-100/80 to-teal-100/80 dark:from-dream-900/50 dark:to-teal-900/50 -z-10" />
      
      {/* Abstract shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-dream-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-10 left-1/3 w-32 h-32 bg-coral-400/20 rounded-full blur-xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-6 text-center md:text-left mb-10 md:mb-0">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Découvrez Votre <span className="bg-gradient-to-r from-dream-600 to-teal-500 bg-clip-text text-transparent">Emploi de Rêve</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Des milliers d'opportunités pour faire avancer votre carrière. Trouvez le poste qui correspond à votre passion et à vos compétences.
            </p>
            
            {/* Search Form */}
            <div className="max-w-2xl mx-auto md:mx-0">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Titre de poste, compétence ou mot-clé" 
                      className="pl-10 rounded-lg border-muted-foreground/20" 
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Ville ou code postal" 
                      className="pl-10 rounded-lg border-muted-foreground/20" 
                    />
                  </div>
                  <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start text-sm text-muted-foreground">
              <span>Tendances:</span>
              <a href="#" className="hover:text-primary">Développeur Full-Stack</a>
              <span>•</span>
              <a href="#" className="hover:text-primary">Marketing Digital</a>
              <span>•</span>
              <a href="#" className="hover:text-primary">Data Scientist</a>
              <span>•</span>
              <a href="#" className="hover:text-primary">UX Designer</a>
            </div>
          </div>
          
          {/* Illustration */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-hero rounded-full blur-3xl opacity-20"></div>
              <div className="relative animate-float">
                <div className="glass-card p-6 rounded-lg mb-4 shadow-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-dream-100 rounded-md flex items-center justify-center text-dream-600">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Développeur Frontend</h3>
                      <p className="text-sm text-muted-foreground">TechVision • Paris</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Salaire</span>
                      <span className="font-medium">45-55k €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">CDI</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-lg shadow-lg ml-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-md flex items-center justify-center text-teal-600">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Product Manager</h3>
                      <p className="text-sm text-muted-foreground">InnovateCorp • Lyon</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Salaire</span>
                      <span className="font-medium">60-70k €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">CDI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
