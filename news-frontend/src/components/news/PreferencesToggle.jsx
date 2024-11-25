import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { useNews } from '../../context/NewsContext';
import { availableCategories, availableSources } from '../../utils/constants';

const PreferencesToggle = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { preferences, updatePreferences } = usePreferences();
  const { articles, fetchArticles } = useNews();
  
  // Add local preferences state
  const [localPreferences, setLocalPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });

  // Initialize local preferences when the component mounts or preferences change
  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  // Extract unique authors from articles
  useEffect(() => {
    const uniqueAuthors = [...new Set(
      articles
        .map(article => article.author)
        .filter(author => author !== null && author.trim() !== '')
    )];
    setAvailableAuthors(uniqueAuthors.sort());
  }, [articles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updatePreferences(localPreferences);
      fetchArticles({
        sources: localPreferences.sources,
        categories: localPreferences.categories,
        authors: localPreferences.authors
      });
      
      setMessage({ type: 'success', text: 'Preferences saved successfully!' });
      setIsExpanded(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save preferences. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCategoryToggle = (category) => {
    const newCategories = localPreferences.categories.includes(category)
      ? localPreferences.categories.filter(c => c !== category)
      : [...localPreferences.categories, category];

    setLocalPreferences({ ...localPreferences, categories: newCategories });
  };

  const handleSourceToggle = (source) => {
    const newSources = localPreferences.sources.includes(source.name)
      ? localPreferences.sources.filter(s => s !== source.name)
      : [...localPreferences.sources, source.name];
  
    setLocalPreferences({ ...localPreferences, sources: newSources });
  };

  const handleAuthorToggle = (author) => {
    const newAuthors = localPreferences.authors.includes(author)
      ? localPreferences.authors.filter(a => a !== author)
      : [...localPreferences.authors, author];

    setLocalPreferences({ ...localPreferences, authors: newAuthors });
  };

  const handleCancel = () => {
    setLocalPreferences(preferences); // Reset local preferences to global preferences
    setIsExpanded(false);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Customize Your News Preferences
        </h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {message.text && (
            <div className={`mb-4 p-4 rounded ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableCategories.map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localPreferences.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sources Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">News Sources</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSources.map(source => (
                <label key={source.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localPreferences.sources.includes(source.name)}
                    onChange={() => handleSourceToggle(source)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{source.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Authors Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Authors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableAuthors.map(author => (
                <label key={author} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localPreferences.authors.includes(author)}
                    onChange={() => handleAuthorToggle(author)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{author}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PreferencesToggle;