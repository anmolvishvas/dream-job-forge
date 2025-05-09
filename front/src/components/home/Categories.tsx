
import { Link } from "react-router-dom";
import { Code, PenTool, Briefcase, LineChart, Cpu, GraduationCap, VideoIcon, ShoppingCart, HeartPulse } from "lucide-react";

type Category = {
  id: number;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
};

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Développement",
    icon: <Code className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 450,
    color: "dream"
  },
  {
    id: 2,
    name: "Design",
    icon: <PenTool className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 280,
    color: "coral"
  },
  {
    id: 3,
    name: "Business",
    icon: <Briefcase className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 320,
    color: "teal"
  },
  {
    id: 4,
    name: "Marketing",
    icon: <LineChart className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 210,
    color: "dream"
  },
  {
    id: 5,
    name: "IT & Logiciels",
    icon: <Cpu className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 380,
    color: "coral"
  },
  {
    id: 6,
    name: "Éducation",
    icon: <GraduationCap className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 150,
    color: "teal"
  },
  {
    id: 7,
    name: "Média & Communication",
    icon: <VideoIcon className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 120,
    color: "dream"
  },
  {
    id: 8,
    name: "Vente & Commerce",
    icon: <ShoppingCart className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 260,
    color: "coral"
  },
  {
    id: 9,
    name: "Santé",
    icon: <HeartPulse className="h-6 w-6 group-hover:text-white transition-colors" />,
    count: 190,
    color: "teal"
  }
];

const Categories = () => {
  const getGradient = (color: string) => {
    switch (color) {
      case "dream":
        return "from-dream-500 to-dream-600";
      case "coral":
        return "from-coral-500 to-coral-600";
      case "teal":
        return "from-teal-500 to-teal-600";
      default:
        return "from-dream-500 to-dream-600";
    }
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Parcourez par Catégorie</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez les opportunités d'emploi par secteur et trouvez votre chemin professionnel idéal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.id} 
              to={`/jobs?category=${category.name}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-border/60 p-6 hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="flex items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 dark:bg-${category.color}-900/30 flex items-center justify-center text-${category.color}-600 dark:text-${category.color}-400 mr-4 group-hover:bg-gradient-to-r ${getGradient(category.color)} transition-all duration-300`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {category.count} offres disponibles
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-border/60 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Voir les offres</span>
                  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-dream-500 to-dream-600 bg-clip-text text-transparent">
                    Explorer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
