import { createContext, useState, useContext, useEffect } from 'react';
import newsService from '../services/newsService';
import { usePreferences } from './PreferencesContext';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { preferences } = usePreferences(); // Get user preferences
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default preferences if none are set
  const defaultPreferences = {
    sources: [],
    categories: [],
    authors: [],
  };

  const [filters, setFilters] = useState({
    q: '',
    from: '',
    categories: '',
    sources: '',
    authors: '',
  });

  const fetchArticles = async () => {
    try {
      setLoading(true);

      // Determine effective preferences (user, default, or none)
      const effectivePreferences = {
        sources: preferences.sources.length > 0 ? preferences.sources : defaultPreferences.sources,
        categories: preferences.categories.length > 0 ? preferences.categories : defaultPreferences.categories,
        authors: preferences.authors.length > 0 ? preferences.authors : defaultPreferences.authors,
      };

      // Check if there are active filters or preferences
      const hasActiveFilters = Object.values(filters).some((value) => value);
      const hasActivePreferences =
        effectivePreferences.sources.length > 0 ||
        effectivePreferences.categories.length > 0 ||
        effectivePreferences.authors.length > 0;

      let query = {};

      if (hasActiveFilters) {
        // Use filters if they are set
        query = { ...filters };
      } else if (hasActivePreferences) {
        // Use preferences if no filters are set
        query = {
          sources: effectivePreferences.sources.join(','),
          categories: effectivePreferences.categories.join(','),
          authors: effectivePreferences.authors.join(','),
        };
      }

      // Fetch articles: If neither filters nor preferences are active, fetch all
      const articlesData = await newsService.getArticles(query);

      setArticles(articlesData);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(); // Fetch articles whenever preferences or filters change
  }, [preferences, filters]);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        loading,
        filters,
        updateFilters,
        fetchArticles,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
