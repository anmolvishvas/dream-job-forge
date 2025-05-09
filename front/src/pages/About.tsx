import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Briefcase, Users, Building, Search, Check } from "lucide-react";
import { fetchTeamMembers } from "@/api/team";
import { fetchStats } from "@/api/stat";

const About = () => { 
  const [teamMembers, setTeamMembers] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchTeamMembers().then(setTeamMembers);
    fetchStats().then(setStats);
  }, []);
  
  return (
    <PageLayout>
      {/* Section Hero */}
      <div className="bg-gradient-to-r from-dream-100/80 to-teal-100/80 dark:from-dream-900/50 dark:to-teal-900/50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de DreamJobForge</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Nous mettons en relation les talents avec leur emploi de rêve grâce à une plateforme innovante centrée sur l'humain et la technologie.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                Rejoindre la communauté
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Section Notre Mission */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
              <p className="text-lg mb-6">
                Chez DreamJobForge, nous croyons que chaque personne mérite un emploi qui lui permette de s'épanouir professionnellement et personnellement. Notre mission est de transformer le processus de recrutement en créant une expérience transparente, efficace et humaine.
              </p>
              <p className="text-lg mb-6">
                Grâce à notre technologie avancée et notre approche centrée sur l'humain, nous aidons les candidats à trouver l'emploi de leurs rêves et les entreprises à identifier les talents qui correspondent parfaitement à leurs besoins et à leur culture.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-primary/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>Mettre en relation les candidats avec les entreprises qui partagent leurs valeurs</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-primary/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>Simplifier et humaniser le processus de recrutement</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-primary/20 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>Promouvoir la diversité et l'inclusion dans le monde du travail</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Notre mission" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-dream-500 to-dream-600 rounded-lg opacity-20 -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section Statistiques */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Notre Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section Comment ça marche */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment Ça Marche</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              DreamJobForge simplifie le processus de recrutement pour les candidats et les entreprises
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-dream-500 to-dream-600"></div>
              <CardContent className="p-6">
                <div className="mb-6 w-12 h-12 bg-dream-100 text-dream-600 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Pour les Candidats</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="font-bold mr-2">1.</span>
                    <span>Créez votre profil professionnel et importez votre CV</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">2.</span>
                    <span>Parcourez les offres d'emploi et postulez en quelques clics</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">3.</span>
                    <span>Recevez des recommandations personnalisées d'offres</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">4.</span>
                    <span>Suivez vos candidatures et démarrez votre nouvelle carrière</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-600"></div>
              <CardContent className="p-6">
                <div className="mb-6 w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Pour les Entreprises</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="font-bold mr-2">1.</span>
                    <span>Créez votre profil d'entreprise et présentez votre culture</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">2.</span>
                    <span>Publiez des offres d'emploi détaillées et attractives</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">3.</span>
                    <span>Recevez des candidatures qualifiées et pertinentes</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">4.</span>
                    <span>Gérez efficacement vos processus de recrutement</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-dream-500 to-teal-500"></div>
              <CardContent className="p-6">
                <div className="mb-6 w-12 h-12 bg-dream-50 text-dream-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Notre Technologie</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 bg-primary/20 p-1 rounded-full">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Algorithmes de matching intelligent entre candidats et offres</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 bg-primary/20 p-1 rounded-full">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Analyse des compétences et des expériences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 bg-primary/20 p-1 rounded-full">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Recommandations personnalisées basées sur les préférences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-2 bg-primary/20 p-1 rounded-full">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>Interface intuitive et expérience utilisateur optimisée</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Section Notre équipe */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des professionnels passionnés qui travaillent chaque jour pour révolutionner le monde du recrutement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary mb-3">{member.role}</p>
                    <p className="text-muted-foreground">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-6">
              Rejoignez-nous dans notre mission pour transformer le monde du recrutement
            </p>
            <Link to="/careers">
              <Button className="bg-gradient-hero hover:opacity-90">
                Voir nos offres d'emploi
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Section CTA */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-dream-600 to-teal-600 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à trouver votre emploi de rêve ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Des milliers d'opportunités vous attendent. Créez votre profil gratuitement et commencez votre recherche dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Inscription Candidat
                </Button>
              </Link>
              <Link to="/recruiter-register">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Espace Recruteur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
