import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize demo account if no users exist
    const users = localStorage.getItem("cashflow_users");
    if (!users) {
      const demoUsers = [
        {
          id: "1",
          username: "Demo User",
          email: "demo@cashflow.com",
          password: "demo123",
        },
      ];
      localStorage.setItem("cashflow_users", JSON.stringify(demoUsers));
    }

    const stored = localStorage.getItem("cashflow_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("cashflow_users") || "[]");
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };

      setUser(userData);
      localStorage.setItem("cashflow_user", JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("cashflow_users") || "[]");

      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email already exists");
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem("cashflow_users", JSON.stringify(users));

      const userData = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };

      setUser(userData);
      localStorage.setItem("cashflow_user", JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cashflow_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
