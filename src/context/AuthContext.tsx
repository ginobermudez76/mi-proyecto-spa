import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('userEmail') || 'admin@upse.edu.ec';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAuthenticated');
    return saved === null ? true : saved === 'true';
  });

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
