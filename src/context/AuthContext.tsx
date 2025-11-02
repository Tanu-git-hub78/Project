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

// Define specific login credentials
const LOGIN_CREDENTIALS = {
  student: { username: 'Tanu1', password: 'Roll123' },
  admin: { username: 'Tanu2', password: 'Roll1234' },
  examiner: { username: 'examiner1', password: 'Roll12345' }
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
    // Determine user type based on credentials
    let userType: 'student' | 'admin' | 'examiner' | null = null;
    
    if (username === LOGIN_CREDENTIALS.student.username && password === LOGIN_CREDENTIALS.student.password) {
      userType = 'student';
    } else if (username === LOGIN_CREDENTIALS.admin.username && password === LOGIN_CREDENTIALS.admin.password) {
      userType = 'admin';
    } else if (username === LOGIN_CREDENTIALS.examiner.username && password === LOGIN_CREDENTIALS.examiner.password) {
      userType = 'examiner';
    }
    
    if (!userType) {
      return false; // Invalid credentials
    }

    // Get user data based on type
    let userData: User | undefined;
    
    if (userType === 'student') {
      userData = students.find(s => s.id === 'student1');
    } else if (userType === 'admin') {
      userData = admins.find(a => a.id === 'admin1');
    } else if (userType === 'examiner') {
      userData = examiners.find(e => e.id === 'examiner1');
    }
    
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
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