
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { MapPin, Users, Briefcase, Globe, ChevronLeft, Clock, Euro, BookmarkIcon } from "lucide-react";

// Type Company et Job pour les données de l'entreprise
type Company = {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  jobs: number;
  description?: string;
  website?: string;
  founded?: string;
  values?: string[];
  benefits?: string[];
};

type Job = {
  id: number;
  title: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  tags: string[];
};

// Données d'exemple des entreprises
const COMPANIES_DATA: Company[] = [
  {
    id: 1,
    name: "TechVision",
    logo: "/placeholder.svg",
    industry: "Technologie",
    location: "Paris, France",
    employees: "50-200",
    jobs: 15,
    description: "TechVision est une entreprise innovante spécialisée dans le développement de solutions d'intelligence artificielle et de réalité augmentée pour les secteurs de la santé et de l'éducation. Fondée en 2015, notre mission est d'améliorer la vie quotidienne grâce à des technologies accessibles et intuitives.",
    website: "www.techvision.fr",
    founded: "2015",
    values: [
      "Innovation constante",
      "Collaboration",
      "Excellence technique",
      "Responsabilité sociale"
    ],
    benefits: [
      "Horaires flexibles",
      "Télétravail partiel",
      "Formation continue",
      "Tickets restaurant",
      "Assurance santé premium",
      "Participation aux bénéfices"
    ]
  },
  {
    id: 2,
    name: "GreenEco Solutions",
    logo: "/placeholder.svg",
    industry: "Environnement",
    location: "Lyon, France",
    employees: "10-50",
    jobs: 8,
    description: "GreenEco Solutions propose des services de conseil en développement durable et des solutions technologiques innovantes pour aider les entreprises à réduire leur empreinte carbone. Notre équipe d'experts accompagne les organisations dans leur transition écologique.",
    website: "www.greenecosoluciones.fr",
    founded: "2018",
    values: [
      "Développement durable",
      "Transparence",
      "Impact positif",
      "Innovation responsable"
    ],
    benefits: [
      "Semaine de 4 jours",
      "Travail hybride",
      "Congés solidaires",
      "Journées dédiées aux projets personnels",
      "Programme bien-être"
    ]
  },
  {
    id: 3,
    name: "FinTech Innovations",
    logo: "/placeholder.svg",
    industry: "Finance",
    location: "Paris, France",
    employees: "200-500",
    jobs: 24,
    description: "FinTech Innovations révolutionne le secteur bancaire avec ses plateformes de paiement sécurisées et ses solutions d'investissement automatisées. Notre technologie permet aux particuliers et aux entreprises de gérer leurs finances de manière plus efficace et transparente.",
    website: "www.fintechinnovations.fr",
    founded: "2012",
    values: [
      "Sécurité",
      "Accessibilité financière",
      "Transparence",
      "Innovation"
    ],
    benefits: [
      "Plans d'actionnariat salarié",
      "Bonus de performance",
      "Assurance internationale",
      "Formation continue",
      "Gym sur place"
    ]
  }
  // Autres entreprises...
];

// Offres d'emploi par entreprise
const COMPANY_JOBS: Record<number, Job[]> = {
  1: [ // TechVision
    {
      id: 1,
      title: "Développeur Full-Stack JavaScript",
      location: "Paris, France",
      salary: "50-65k €",
      type: "CDI",
      posted: "Il y a 2 jours",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 7,
      title: "Ingénieur IA",
      location: "Paris, France",
      salary: "60-75k €",
      type: "CDI",
      posted: "Il y a 1 jour",
      tags: ["Python", "TensorFlow", "Machine Learning"]
    },
    {
      id: 10,
      title: "Chef de Produit Tech",
      location: "Paris, France (Remote)",
      salary: "55-70k €",
      type: "CDI",
      posted: "Il y a 5 jours",
      tags: ["Product Management", "Agile", "UX"]
    }
  ],
  2: [ // GreenEco Solutions
    {
      id: 12,
      title: "Consultant en Développement Durable",
      location: "Lyon, France",
      salary: "40-50k €",
      type: "CDI",
      posted: "Il y a 3 jours",
      tags: ["RSE", "Analyse d'Impact", "Développement Durable"]
    },
    {
      id: 13,
      title: "Développeur Java Backend",
      location: "Lyon, France",
      salary: "45-55k €",
      type: "CDI",
      posted: "Il y a 4 jours",
      tags: ["Java", "Spring", "PostgreSQL"]
    }
  ],
  3: [ // FinTech Innovations
    {
      id: 16,
      title: "Analyste de Données Financières",
      location: "Paris, France",
      salary: "50-60k €",
      type: "CDI",
      posted: "Il y a 2 jours",
      tags: ["SQL", "Python", "Power BI"]
    },
    {
      id: 17,
      title: "Développeur Blockchain",
      location: "Paris, France",
      salary: "70-85k €",
      type: "CDI",
      posted: "Il y a 1 jour",
      tags: ["Ethereum", "Smart Contracts", "Solidity"]
    }
  ]
};

const CompanyDetail = () => {
  const { id } = useParams();
  const companyId = parseInt(id || "0");
  
  // Trouver l'entreprise correspondant à l'ID
  const company = COMPANIES_DATA.find(company => company.id === companyId);
  
  // Trouver les offres d'emploi pour cette entreprise
  const jobs = COMPANY_JOBS[companyId] || [];
  
  // Rediriger vers NotFound si l'entreprise n'existe pas
  if (!company) {
    return <Navigate to="/404" replace />;
  }
  
  return (
    <PageLayout>
      <div className="bg-muted/50 py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Navigation retour */}
          <Link to="/companies" className="flex items-center text-primary mb-6 hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux entreprises
          </Link>
          
          {/* En-tête de l'entreprise */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-6 w-32 h-32 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <p className="text-muted-foreground">{company.industry}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{company.employees} employés</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{company.jobs} offres d'emploi</span>
                  </div>
                  {company.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                      <a 
                        href={`https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <Button className="bg-gradient-hero hover:opacity-90">
                  Suivre l'entreprise
                </Button>
              </div>
            </div>
          </div>
          
          {/* À propos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">À propos de {company.name}</h2>
                  <p className="mb-6">{company.description}</p>
                  
                  {company.values && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">Nos valeurs</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {company.values.map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {company.benefits && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Avantages entreprise</h3>
                      <div className="flex flex-wrap gap-2">
                        {company.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="font-normal">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Informations</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Secteur</p>
                      <p className="font-medium">{company.industry}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Taille de l'entreprise</p>
                      <p className="font-medium">{company.employees} employés</p>
                    </div>
                    
                    {company.founded && (
                      <div>
                        <p className="text-sm text-muted-foreground">Fondée en</p>
                        <p className="font-medium">{company.founded}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Localisation</p>
                      <p className="font-medium">{company.location}</p>
                    </div>
                    
                    {company.website && (
                      <div>
                        <p className="text-sm text-muted-foreground">Site web</p>
                        <a 
                          href={`https://${company.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {company.website}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Offres d'emploi */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Offres d'emploi chez {company.name}</h2>
            
            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-all duration-200 overflow-hidden border-border/60">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
                          <p className="text-muted-foreground">{company.name}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
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
                          <Badge key={index} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Link to={`/jobs/${job.id}`}>
                          <Button className="w-full bg-gradient-to-r from-dream-500 to-dream-600 hover:opacity-90">
                            Voir le détail
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
                  Aucune offre d'emploi disponible actuellement.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Revenez prochainement pour voir les nouvelles opportunités.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CompanyDetail;
