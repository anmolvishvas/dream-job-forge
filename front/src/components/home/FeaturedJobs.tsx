
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, MapPin, Clock, Euro } from "lucide-react";

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
};

const FEATURED_JOBS: Job[] = [
  {
    id: 1,
    title: "Développeur Full-Stack JavaScript",
    company: "TechInnovate",
    location: "Paris, France",
    salary: "50-65k €",
    type: "CDI",
    posted: "Il y a 2 jours",
    logo: "/placeholder.svg",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Chef de Projet Digital",
    company: "AgenceCreative",
    location: "Lyon, France",
    salary: "45-55k €",
    type: "CDI",
    posted: "Il y a 3 jours",
    logo: "/placeholder.svg",
    tags: ["Gestion de Projet", "Marketing Digital", "Agile"]
  },
  {
    id: 3,
    title: "Product Designer UX/UI",
    company: "DesignStudio",
    location: "Bordeaux, France (Remote)",
    salary: "40-50k €",
    type: "CDI",
    posted: "Il y a 5 jours",
    logo: "/placeholder.svg",
    tags: ["Figma", "UI Design", "User Testing"]
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataInsight",
    location: "Nantes, France",
    salary: "55-65k €",
    type: "CDI",
    posted: "Il y a 1 jour",
    logo: "/placeholder.svg",
    tags: ["Python", "Machine Learning", "SQL"]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Lille, France",
    salary: "60-75k €",
    type: "CDI",
    posted: "Il y a 4 jours",
    logo: "/placeholder.svg",
    tags: ["AWS", "Docker", "CI/CD"]
  },
  {
    id: 6,
    title: "Responsable Marketing Digital",
    company: "E-Commerce Leader",
    location: "Toulouse, France",
    salary: "45-55k €",
    type: "CDI",
    posted: "Il y a 3 jours",
    logo: "/placeholder.svg",
    tags: ["SEO", "Paid Ads", "Analytics"]
  }
];

const FeaturedJobs = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Offres d'Emploi en Vedette</h2>
            <p className="text-muted-foreground">Découvrez les meilleures opportunités de notre sélection</p>
          </div>
          <Link to="/jobs">
            <Button variant="outline" className="mt-4 md:mt-0">
              Voir toutes les offres
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_JOBS.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-all duration-200 overflow-hidden border-border/60">
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
                      <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
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
      </div>
    </section>
  );
};

export default FeaturedJobs;
