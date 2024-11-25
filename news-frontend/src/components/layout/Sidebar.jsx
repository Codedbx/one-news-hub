
import { usePreferences } from '../../context/PreferencesContext';
import { useNews } from '../../context/NewsContext';
import { sources, categories } from '../../utils/constants';

const Sidebar = () => {
  const { preferences, updatePreferences } = usePreferences();
  const { updateFilters } = useNews();

  const handleSourceToggle = (sourceId) => {
    const newSources = preferences.sources.includes(sourceId)
      ? preferences.sources.filter(id => id !== sourceId)
      : [...preferences.sources, sourceId];
    
    updatePreferences({ ...preferences, sources: newSources });
    updateFilters({ sources: newSources });
  };

  const handleCategoryToggle = (category) => {
    const newCategories = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category];
    
    updatePreferences({ ...preferences, categories: newCategories });
    updateFilters({ categories: newCategories });
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4 h-screen">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">News Sources</h3>
        <div className="space-y-2">
          {sources.map(source => (
            <label key={source.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.sources.includes(source.id)}
                onChange={() => handleSourceToggle(source.id)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{source.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;