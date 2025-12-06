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
    let userData: User;
    
    if (userType === 'student') {
      const studentData = students.find(s => s.id === 'student1');
      if (studentData) {
        userData = {
          id: studentData.id,
          username: username,
          role: 'student',
          name: studentData.name,
          email: studentData.email,
          department: 'Computer Science',
          rollNumber: studentData.rollNumber,
          college: studentData.college,
          degree: studentData.degree
        };
      } else {
        return false;
      }
    } else if (userType === 'admin') {
      const adminData = admins.find(a => a.id === 'admin1');
      if (adminData) {
        userData = {
          id: adminData.id,
          username: username,
          role: 'admin',
          name: adminData.name,
          email: adminData.email,
          department: adminData.department,
          college: adminData.college
        };
      } else {
        return false;
      }
    } else if (userType === 'examiner') {
      const examinerData = examiners.find(e => e.id === 'examiner1');
      if (examinerData) {
        userData = {
          id: examinerData.id,
          username: username,
          role: 'examiner',
          name: examinerData.name,
          email: examinerData.email,
          department: examinerData.department,
          college: examinerData.college
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
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