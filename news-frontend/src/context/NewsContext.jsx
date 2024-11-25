import { createContext, useState, useContext, useEffect } from 'react';
import newsService from '../services/newsService';
import { sources } from '../utils/constants';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    q: '',
    from: '',
    categories: '',
    sources: '',
    authors: '',
  });

  const fetchArticles = async (preferences = {}) => {
    try {
      setLoading(true);
      const { sources = [], categories = [], authors = [] } = preferences;

      // Apply filters based on preferences
      const filteredArticles = await newsService.getArticles(filters);

      // Further filter articles based on user preferences
      const processedArticles = filteredArticles.filter(
        (article) =>
          (sources.length === 0 || sources.includes(article.source)) &&
          (categories.length === 0 || categories.includes(article.category)) &&
          (authors.length === 0 || authors.includes(article.author))
      );

      setArticles(processedArticles);
    } catch (error) {
      console.error(error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filters]);

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
