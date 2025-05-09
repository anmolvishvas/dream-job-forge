import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Search, MapPin, Users, Filter } from "lucide-react";
import { fetchCompanies } from "@/api/company";

type Company = {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  jobs: number;
  description?: string;
};


const Companies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Logique de filtrage des entreprises
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter
      ? company.industry === industryFilter
      : true;
    const matchesLocation = locationFilter
      ? company.location.includes(locationFilter)
      : true;

    return matchesSearch && matchesIndustry && matchesLocation;
  });

  // Pagination simple
  const companiesPerPage = 6;
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  // Extraire les industries uniques pour le filtre
  const industries = Array.from(
    new Set(companies.map((company) => company.industry))
  );

  // Extraire les villes uniques pour le filtre
  const locations = Array.from(
    new Set(
      companies.map((company) => {
        const city = company.location.split(",")[0].trim();
        return city;
      })
    )
  );

  return (
    <PageLayout>
      <div className="bg-muted/50 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Entreprises</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Découvrez les entreprises qui recrutent et trouvez votre futur
            employeur parmi notre sélection de sociétés innovantes.
          </p>

          {/* Filtres et recherche */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom d'entreprise"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
                <Select
                  value={industryFilter}
                  onValueChange={setIndustryFilter}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Secteur d'activité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les secteurs</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button className="bg-gradient-hero hover:opacity-90 md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
            </div>
          </div>

          {/* Liste des entreprises */}
          {currentCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentCompanies.map((company) => (
                <Card
                  key={company.id}
                  className="hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex items-center justify-center h-24 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="h-16 w-auto object-contain"
                      />
                    </div>

                    <h3 className="font-semibold text-lg text-center">
                      {company.name}
                    </h3>
                    <p className="text-muted-foreground text-center text-sm mb-4">
                      {company.industry}
                    </p>

                    <div className="flex flex-col space-y-2 mb-4">
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{company.employees} employés</span>
                      </div>
                    </div>

                    <p className="text-sm text-center mb-4 line-clamp-3">
                      {company.description}
                    </p>

                    <div className="mt-auto text-center">
                      <Link to={`/companies/${company.id}`}>
                        <Button
                          variant="link"
                          className="bg-gradient-to-r from-dream-500 to-dream-600 bg-clip-text text-transparent"
                        >
                          {company.jobs} offres disponibles
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-xl text-muted-foreground">
                Aucune entreprise ne correspond à vos critères de recherche.
              </p>
              <Button
                className="mt-4 bg-gradient-hero hover:opacity-90"
                onClick={() => {
                  setSearchTerm("");
                  setIndustryFilter("");
                  setLocationFilter("");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredCompanies.length > 0 && (
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

export default Companies;
