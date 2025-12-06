import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Eye, EyeOff, GraduationCap, UserCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<'student' | 'admin' | 'examiner' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = login(username, password);
      if (success) {
        // Small delay to show loading state
        setTimeout(() => {
          if (loginType === 'student') {
            navigate('/student');
          } else if (loginType === 'admin') {
            navigate('/admin');
          } else if (loginType === 'examiner') {
            navigate('/examiner');
          }
          setIsLoading(false);
        }, 500);
      } else {
        setError('Invalid Username or Password');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLoginTypeSelect = (type: 'student' | 'admin' | 'examiner') => {
    setLoginType(type);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleBack = () => {
    setLoginType(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (!loginType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                University Project Portal
              </h1>
              <p className="text-gray-600">Choose your login type to continue</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleLoginTypeSelect('student')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <User className="h-6 w-6" />
                <span className="text-lg">Student Login</span>
              </button>
              
              <button
                onClick={() => handleLoginTypeSelect('admin')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Shield className="h-6 w-6" />
                <span className="text-lg">Admin Login</span>
              </button>

              <button
                onClick={() => handleLoginTypeSelect('examiner')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <UserCheck className="h-6 w-6" />
                <span className="text-lg">Examiner Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getLoginConfig = () => {
    switch (loginType) {
      case 'student':
        return { color: 'blue', icon: User };
      case 'admin':
        return { color: 'purple', icon: Shield };
      case 'examiner':
        return { color: 'green', icon: UserCheck };
      default:
        return { color: 'blue', icon: User };
    }
  };

  const config = getLoginConfig();
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-${config.color}-100`}>
              <IconComponent className={`h-8 w-8 text-${config.color}-600`} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {loginType.charAt(0).toUpperCase() + loginType.slice(1)} Login
            </h1>
            <p className="text-gray-600">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors bg-${config.color}-600 hover:bg-${config.color}-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Login Options
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;