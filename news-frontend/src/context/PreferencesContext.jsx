import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import newsService from '../services/newsService';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: [],
  });

  useEffect(() => {
    if (user) {
      loadUserPreferences();
    }
  }, [user]);

  const loadUserPreferences = async () => {
    try {
      // const response = await fetch('/api/preferences');
      const response = await newsService.getPreference();
      if (!response.ok) {
        throw new Error('Failed to load preferences');
      }
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      
      const response = await newsService.savePreference(newPreferences);

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
