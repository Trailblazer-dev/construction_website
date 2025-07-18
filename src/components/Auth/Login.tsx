import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-800">
      <div className="bg-earth-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Add back to welcome page link */}
        <div className="mb-6 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-sky-300 hover:text-sky-400 transition-colors flex items-center text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Welcome Page
          </Link>
          <div className="bg-earth-600/50 px-2 py-1 rounded text-xs text-sky-300/80">
            Road Construction Platform
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
          <p className="text-sky-300/80 mt-2">Access your account</p>
        </div>
        
        {error && (
          <div className="bg-danger-900/20 border border-danger-800/30 text-danger-400 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sky-300/80 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 bg-earth-600 border border-earth-500 rounded text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sky-300/80 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full p-3 bg-earth-600 border border-earth-500 rounded text-white pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-earth-400" />
                ) : (
                  <Eye className="h-5 w-5 text-earth-400" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-sky-300/60">
            Demo Accounts:
          </p>
          <div className="text-xs text-sky-300/60 mt-2">
            <p>admin@example.com / admin123 (Admin)</p>
            <p>john@example.com / password (Construction Manager)</p>
            <p>elena@example.com / password (Engineer)</p>
            <p>mike@example.com / password (Driver)</p>
            <p>client@example.com / password (Client)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
