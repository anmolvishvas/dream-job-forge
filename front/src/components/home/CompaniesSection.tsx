
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users } from "lucide-react";

type Company = {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  jobs: number;
};

const TOP_COMPANIES: Company[] = [
  {
    id: 1,
    name: "TechVision",
    logo: "/placeholder.svg",
    industry: "Technologie",
    location: "Paris, France",
    employees: "50-200",
    jobs: 15
  },
  {
    id: 2,
    name: "GreenEco Solutions",
    logo: "/placeholder.svg",
    industry: "Environnement",
    location: "Lyon, France",
    employees: "10-50",
    jobs: 8
  },
  {
    id: 3,
    name: "FinTech Innovations",
    logo: "/placeholder.svg",
    industry: "Finance",
    location: "Paris, France",
    employees: "200-500",
    jobs: 24
  },
  {
    id: 4,
    name: "MediaCraft",
    logo: "/placeholder.svg",
    industry: "Médias & Communication",
    location: "Bordeaux, France",
    employees: "10-50",
    jobs: 5
  }
];

const CompaniesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Entreprises en Vedette</h2>
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
          {TOP_COMPANIES.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex items-center justify-center h-24 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-16 w-auto object-contain"
                  />
                </div>

                <h3 className="font-semibold text-lg text-center">{company.name}</h3>
                <p className="text-muted-foreground text-center text-sm mb-4">{company.industry}</p>

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
                    <Button variant="link" className="bg-gradient-to-r from-dream-500 to-dream-600 bg-clip-text text-transparent">
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
