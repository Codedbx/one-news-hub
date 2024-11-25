import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false); 
        return;
      }
  
      try {
        const user = await authService.getUserFromToken(token); 
        setUser(user); 
      } catch (err) {
        console.error('Token validation failed:', err.message);
        setError('Failed to validate token. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
      } finally {
        setLoading(false); 
      }
    };
  
    validateToken(); 
  }, []);
  
  



  const login = async (email, password) => {
    setError(null); 
    try {
      setLoading(true);
      const { token, user } = await authService.login(email, password);


      
      localStorage.setItem('token', token);
      setUser(user);

      return true; 
    } catch (err) {
      setError(err.message); 
      return false; 
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const { token, user } = await authService.register(userData);
      setUser(user);
      localStorage.setItem('token', token);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
