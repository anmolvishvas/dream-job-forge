import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BookmarkIcon,
  MapPin,
  Clock,
  Euro,
  Search,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import { fetchJobs } from "@/api/job";

// Nous réutilisons le type Job du composant FeaturedJobs
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  tags: string[];
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
};

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Logique de filtrage des offres
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationType
      ? job.location.includes(locationType)
      : true;
    const matchesJobType = jobType ? job.type === jobType : true;

    return matchesSearch && matchesLocation && matchesJobType;
  });

  // Pagination simple
  const jobsPerPage = 6;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <PageLayout>
      <div className="bg-muted/50 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Offres d'Emploi
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Découvrez les meilleures opportunités professionnelles adaptées à
            vos compétences et à vos aspirations.
          </p>

          {/* Filtres et recherche */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par titre ou entreprise"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
                <Select value={locationType} onValueChange={setLocationType}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les lieux</SelectItem>
                    <SelectItem value="Paris">Paris</SelectItem>
                    <SelectItem value="Lyon">Lyon</SelectItem>
                    <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                    <SelectItem value="Nantes">Nantes</SelectItem>
                    <SelectItem value="Lille">Lille</SelectItem>
                    <SelectItem value="Toulouse">Toulouse</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les contrats</SelectItem>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="Stage">Stage</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-gradient-hero hover:opacity-90 md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
            </div>
          </div>

          {/* Liste des offres */}
          {currentJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-md transition-all duration-200 overflow-hidden border-border/60"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="mr-4 w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <BookmarkIcon className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Euro className="h-4 w-4 mr-2" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{job.posted}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t p-0">
                    <Link to={`/jobs/${job.id}`} className="w-full">
                      <Button className="w-full rounded-none rounded-b-lg bg-gradient-to-r from-dream-500 to-dream-600 hover:opacity-90">
                        Voir le détail
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-xl text-muted-foreground">
                Aucune offre ne correspond à vos critères de recherche.
              </p>
              <Button
                className="mt-4 bg-gradient-hero hover:opacity-90"
                onClick={() => {
                  setSearchTerm("");
                  setLocationType("");
                  setJobType("");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
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
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Jobs;
