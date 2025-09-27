import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { students, admins, examiners, validateCredentials } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const validation = validateCredentials(username, password);
    
    if (validation.isValid && validation.userId && validation.role) {
      let userData: User | undefined;
      
      if (validation.role === "student") {
  userData = students.find(s => s.id === validation.userId);
} else if (validation.role === "admin") {
  userData = admins.find(a => a.id === validation.userId);
} else if (validation.role === "examiner") {
  userData = examiners.find(e => e.id === validation.userId);
}

      
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};