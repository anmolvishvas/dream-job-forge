import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import {
  BookmarkIcon,
  MapPin,
  Building,
  Calendar,
  Clock,
  Euro,
  ChevronLeft,
  Share,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { fetchJobs } from "@/api/job";

// Importation du type Job comme dans la page Jobs
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

const JobDetail = () => {
  const { id } = useParams();
  const jobId = parseInt(id || "0");
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

  // Trouver l'offre correspondant à l'ID
  const job = jobs.find((job) => job.id === jobId);

  // Rediriger vers NotFound si l'offre n'existe pas
  if (!loading && !job) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <PageLayout>
      <div className="bg-muted/50 py-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Navigation retour */}
          <Link
            to="/jobs"
            className="flex items-center text-primary mb-6 hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux offres
          </Link>

          {/* En-tête du poste */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {job.title}
                  </h1>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Building className="h-4 w-4 mr-1" />
                    <Link
                      to={`/companies/${job.id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {job.company}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
                <Button className="bg-gradient-hero hover:opacity-90">
                  Postuler maintenant
                </Button>
              </div>
            </div>

            {/* Informations sur le poste */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-b py-6 my-6">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">
                  Localisation
                </span>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">
                  Type de contrat
                </span>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>{job.type}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Salaire</span>
                <div className="flex items-center mt-1">
                  <Euro className="h-4 w-4 mr-2 text-primary" />
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Publié</span>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{job.posted}</span>
                </div>
              </div>
            </div>

            {/* Étiquettes/Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description du poste */}
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-xl font-bold mb-4">Description du poste</h2>
              <p>{job.description}</p>
            </div>

            {/* Sections détaillées */}
            <div className="space-y-8">
              {job.requirements && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Compétences requises
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.responsibilities && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Responsabilités</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Avantages</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Section de candidature */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Intéressé(e) par ce poste ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                N'attendez pas pour saisir cette opportunité. Postulez dès
                maintenant et démarrez votre nouvelle carrière !
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-gradient-hero hover:opacity-90">
                  Postuler maintenant
                </Button>
                <Button variant="outline" className="flex-1">
                  Enregistrer pour plus tard
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Entreprise */}
          <Card>
            <CardHeader>
              <CardTitle>À propos de {job.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{job.company}</h3>
                  <p className="text-muted-foreground text-sm">
                    {job.location}
                  </p>
                </div>
              </div>

              <p className="mb-4">
                {job.company} est une entreprise innovante spécialisée dans le
                développement de solutions technologiques de pointe. Notre
                mission est de créer des produits qui transforment positivement
                l'expérience utilisateur.
              </p>

              <Link
                to={`/companies/${job.id}`}
                className="inline-flex items-center text-primary hover:underline"
              >
                Voir le profil de l'entreprise
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default JobDetail;
