
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Filter, MapPin, Briefcase, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCandidates } from "@/api/candidate";

// Type pour les profils de candidats
type Candidate = {
  id: number;
  name: string;
  avatar: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  bio: string;
};

const Candidates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCandidates();
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Logique de filtrage simple
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });
  
  // Pagination simple
  const candidatesPerPage = 6;
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  
  return (
    <PageLayout>
      <div className="bg-muted/50 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Candidats Talentueux</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Découvrez les profils de candidats qualifiés et motivés dans divers domaines professionnels.
          </p>
          
          {/* Recherche */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par nom, compétence ou poste" 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button className="bg-gradient-hero hover:opacity-90 md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer les profils
              </Button>
            </div>
          </div>
          
          {/* Liste des candidats */}
          {currentCandidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-all duration-200 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-muted overflow-hidden mb-4">
                        <img
                          src={candidate.avatar}
                          alt={`${candidate.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg text-center">{candidate.name}</h3>
                      <p className="text-primary text-center">{candidate.title}</p>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{candidate.experience} d'expérience</span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4 line-clamp-3">
                      {candidate.bio}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-muted-foreground mb-2">Compétences</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 4 && (
                          <Badge variant="outline" className="font-normal">
                            +{candidate.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="w-full bg-white hover:bg-muted border border-primary text-primary hover:text-primary flex items-center justify-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Contacter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-xl text-muted-foreground">
                Aucun candidat ne correspond à votre recherche.
              </p>
              <Button 
                className="mt-4 bg-gradient-hero hover:opacity-90"
                onClick={() => setSearchTerm("")}
              >
                Réinitialiser la recherche
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredCandidates.length > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({length: totalPages}).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
          
          {/* Appel à l'action */}
          <div className="bg-gradient-to-r from-dream-100 to-teal-100 dark:from-dream-900/50 dark:to-teal-900/50 rounded-lg p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Êtes-vous un candidat à la recherche d'un emploi ?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Créez votre profil professionnel, mettez en avant vos compétences et soyez visible auprès des recruteurs.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                Créer mon profil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Candidates;
