import { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { usePreferences } from '../context/PreferencesContext';
import ArticleList from '../components/news/ArticleList';
import Filters from '../components/news/Filters';
import PreferencesToggle from '../components/news/PreferencesToggle';

const Home = () => {
  const { fetchArticles } = useNews();
  const { preferences } = usePreferences();

  useEffect(() => {
    fetchArticles({
      sources: preferences.sources,
      categories: preferences.categories,
      authors: preferences.authors
    });
  }, [preferences]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your News Feed</h1>
        <p className="mt-2 text-gray-600">Stay updated with the latest news from your preferred sources.</p>
      </div>
      
      <PreferencesToggle />
      
      <Filters />
      
      <div className="mt-8">
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;