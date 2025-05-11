
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";
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

const CompaniesSection = () => {
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

  const featuredCompanies = companies.slice(0, 4);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Entreprises en Vedette
            </h2>
            <p className="text-muted-foreground">
              Découvrez les entreprises qui recrutent activement
            </p>
          </div>
          <Link to="/companies">
            <Button variant="outline" className="mt-4 md:mt-0">
              Voir toutes les entreprises
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCompanies.map((company) => (
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
      </div>
    </section>
  );
};

export default CompaniesSection;
