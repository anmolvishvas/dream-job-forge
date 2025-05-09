
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Will be connected to auth state later

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center"
            >
              <div className="bg-gradient-hero rounded-lg p-2 mr-2">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-dream-600 to-teal-500 bg-clip-text text-transparent">
                DreamJobForge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
              Offres d'emploi
            </Link>
            <Link to="/companies" className="text-muted-foreground hover:text-foreground transition-colors">
              Entreprises
            </Link>
            <Link to="/candidates" className="text-muted-foreground hover:text-foreground transition-colors">
              Candidats
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-hero hover:opacity-90">Inscription</Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Mon compte</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 invisible"
          )}
        >
          <div className="pt-2 pb-4 space-y-1">
            <Link
              to="/jobs"
              className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Offres d'emploi
            </Link>
            <Link
              to="/companies"
              className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Entreprises
            </Link>
            <Link
              to="/candidates"
              className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Candidats
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
            
            {/* Auth buttons - Mobile */}
            <div className="pt-2 space-y-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-hero hover:opacity-90">
                      Inscription
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Mon compte</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
