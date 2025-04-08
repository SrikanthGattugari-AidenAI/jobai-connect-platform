
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Student, Employer } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: "student" | "employer") => Promise<void>;
  register: (userData: Partial<Student | Employer>, role: "student" | "employer") => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for stored user data in localStorage
    const storedUser = localStorage.getItem("internship_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: "student" | "employer") => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a mock user based on role
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
        role,
        profileImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      };
      
      if (role === "employer") {
        (mockUser as Employer).company = "Example Company";
      }
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("internship_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: Partial<Student | Employer>, role: "student" | "employer") => {
    setIsLoading(true);
    try {
      // Mock registration - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a new user based on provided data and role
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name || "",
        email: userData.email || "",
        role,
        profileImage: userData.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      };
      
      if (role === "employer" && 'company' in userData) {
        (newUser as Employer).company = userData.company || "Example Company";
      }
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("internship_user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("internship_user");
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
