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
      if (!user) {
        throw new Error('User not authenticated');
      }
  
      const response = await newsService.getPreference(`/preferences/${user.id}`);
      if (!response.status !== 200) {
        throw new Error('Failed to load preferences');
      }

      console.log(`preference ${response}`);
      const data = response.responseBody;
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
