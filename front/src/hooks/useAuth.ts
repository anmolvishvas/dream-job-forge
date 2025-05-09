import { useState } from "react";
import { API_BASE_URL } from "@/api/config";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "recruiter" | "candidate";
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login_check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect.");
      }

      const data = await response.json();

      const { token } = data;

      localStorage.setItem("auth_token", token);

      return token;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "recruiter" | "candidate";
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }

      const data = await response.json();

      const { token, user } = data;

      localStorage.setItem("auth_token", token);
      setUser(user);

      return user;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'inscription"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
  };

  const hasRole = (role: "admin" | "recruiter" | "candidate") => {
    return user?.role === role;
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    hasRole,
    isAuthenticated: !!user,
  };
};
