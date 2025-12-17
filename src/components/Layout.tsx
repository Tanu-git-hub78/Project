import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();

  const getBgColor = () => {
    switch (user?.role) {
      case 'student': return 'bg-[#843534]';
      case 'admin': return 'bg-[#843534]';
      case 'examiner': return 'bg-[#843534]';
      default: return 'bg-[#843534]';
    }
  };

  const bgColor = getBgColor();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${bgColor} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Samrat Vikramaditya University - UniProjectHub</h1>
              <p className="text-orange-100 capitalize">{user?.role} Dashboard - {title}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <div>
                    <span className="font-medium block">{user?.name}</span>
                    <span className="text-xs opacity-75">{user?.email}</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-[#2B2A29] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">© 2024 Samrat Vikramaditya University - UniProjectHub</p>
              <p className="text-xs text-gray-400 mt-1">Empowering Academic Excellence</p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="flex items-center space-x-2 text-sm hover:text-orange-200 transition-colors">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;