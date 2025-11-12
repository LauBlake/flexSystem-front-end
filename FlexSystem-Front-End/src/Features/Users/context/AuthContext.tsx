import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../service/authService';
import type { JWTPayLoad } from '../service/authService';

const STORAGE_KEY = 'authToken'; // 👈 misma clave

interface AuthContextType {
  user: JWTPayLoad | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => JWTPayLoad | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JWTPayLoad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (authService.isAuthenticated()) {
        setUser(authService.getUserInfo());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    // 👇 guardar con la misma key y decodificar directamente
    localStorage.setItem(STORAGE_KEY, token);
    const userInfo = authService.getUserInfo();
    setUser(userInfo);
    return userInfo;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  return ctx;
};