import { useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('netflix_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Invalid stored data
        localStorage.removeItem('netflix_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    // Mock login - in a real app, this would call an API
    setTimeout(() => {
      if (email && password) {
        const mockUser = {
          id: 1,
          email,
          name: email.split('@')[0],
        };
        
        localStorage.setItem('netflix_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setLoading(false);
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 800);
  };

  const signup = (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    // Mock signup - in a real app, this would call an API
    setTimeout(() => {
      if (email && password) {
        const mockUser = {
          id: 1,
          email,
          name: name || email.split('@')[0],
        };
        
        localStorage.setItem('netflix_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setLoading(false);
      } else {
        setError('Invalid signup information');
        setLoading(false);
      }
    }, 800);
  };

  const logout = () => {
    localStorage.removeItem('netflix_user');
    setUser(null);
  };

  return { user, loading, error, login, signup, logout };
};