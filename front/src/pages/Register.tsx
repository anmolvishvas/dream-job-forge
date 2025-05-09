
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/hooks/useAuth";
import { Briefcase, Eye, EyeOff, User, Building2 } from "lucide-react";

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") === "recruiter" ? "recruiter" : "candidate";
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Les mots de passe ne correspondent pas",
        description: "Veuillez vérifier vos mots de passe.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const user = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role as "recruiter" | "candidate",
      });
      
      if (user) {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès.",
        });
        navigate(formData.role === "candidate" ? "/dashboard/candidate" : "/dashboard/recruiter");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <Card className="border-border/60 shadow-lg">
            <CardHeader className="text-center pb-6 space-y-1">
              <div className="mx-auto bg-gradient-hero rounded-lg p-2 mb-4 w-12 h-12 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold">Créer un compte</CardTitle>
              <CardDescription>
                Commencez votre voyage vers votre emploi de rêve
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input 
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={toggleShowPassword}
                        className="absolute right-0 top-0 h-full px-3 py-2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Je suis</Label>
                    <RadioGroup 
                      defaultValue={formData.role} 
                      name="role"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                      className="flex gap-4"
                    >
                      <div className="flex flex-1 items-center space-x-2">
                        <RadioGroupItem value="candidate" id="candidate" className="peer sr-only" />
                        <Label 
                          htmlFor="candidate" 
                          className="flex flex-col items-center justify-center border border-border/60 rounded-md p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer hover:bg-muted transition-colors w-full"
                        >
                          <User className="h-6 w-6 mb-2 text-primary" />
                          <span>Candidat</span>
                        </Label>
                      </div>
                      <div className="flex flex-1 items-center space-x-2">
                        <RadioGroupItem value="recruiter" id="recruiter" className="peer sr-only" />
                        <Label 
                          htmlFor="recruiter" 
                          className="flex flex-col items-center justify-center border border-border/60 rounded-md p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer hover:bg-muted transition-colors w-full"
                        >
                          <Building2 className="h-6 w-6 mb-2 text-primary" />
                          <span>Recruteur</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-hero hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                </Button>
                
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Déjà inscrit? </span>
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Se connecter
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Register;
