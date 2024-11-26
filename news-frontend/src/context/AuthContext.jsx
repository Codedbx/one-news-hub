import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = window.localStorage.getItem("token");


      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const user = await authService.getUserFromToken();
        
        setUser(user);
        setLoading(false);
      } catch (err) {
        console.error('Token validation failed:', err.message);
        
        window.localStorage.removeItem('token');
        setUser(null);
        setError('Session expired. Please log in again.');
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


      
      window.localStorage.setItem('token', token);

      console.log('Token set in localStorage:', token); // Verify token is being stored
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
    setError(null); 
    try {
      setLoading(true);
      const { token, user } = await authService.register(userData); // Call API
      setUser(user); 
      window.localStorage.setItem('token', token); 
      return true; 
    } catch (err) {
      setError(err.message); 
      return false; 
    } finally {
      setLoading(false); 
    }
  };
  

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
