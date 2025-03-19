
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    // For now, we'll simulate a successful login for demo purposes
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email === "" || password === "") {
        throw new Error("Email and password are required");
      }
      
      // Create demo user
      const newUser = {
        id: "user-" + Date.now(),
        name: email.split("@")[0],
        email
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to your Digital Wardrobe!"
      });
      
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      }
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
      }
      
      // Create new user
      const newUser = {
        id: "user-" + Date.now(),
        name,
        email
      };
      
      // In a real app, you would send this data to a backend API
      toast({
        title: "Account created successfully",
        description: "Please log in with your new account"
      });
      
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
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
