import React, { createContext, useState, useEffect } from 'react';
import type { UserRole } from '../types';

// Define the User type including role
interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export the context
export { AuthContext };

// Mock user data for development
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' },
  { id: 2, name: 'John Smith', email: 'manager@example.com', password: 'password', role: 'construction_manager' },
  { id: 3, name: 'Elena Martinez', email: 'engineer@example.com', password: 'password', role: 'engineer' },
  { id: 4, name: 'Mike Johnson', email: 'driver@example.com', password: 'password', role: 'driver' },
  { id: 5, name: 'Sarah Wong', email: 'client@example.com', password: 'password', role: 'client' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage in a real app)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching credentials
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password before storing user data
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasAnyRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role as UserRole);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  );
};
