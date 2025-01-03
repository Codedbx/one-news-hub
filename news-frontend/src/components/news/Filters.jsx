import { useNews } from '../../context/NewsContext';
import { availableCategories, availableSources } from '../../utils/constants';
import { useState, useEffect } from 'react';

const Filters = () => {
  const { filters, updateFilters } = useNews();
  const [debouncedQuery, setDebouncedQuery] = useState(filters.q);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery !== filters.q) {
        updateFilters({ q: debouncedQuery });
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [debouncedQuery, filters.q, updateFilters]);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search articles..."
        value={debouncedQuery}
        onChange={(e) => setDebouncedQuery(e.target.value)} 
        className="p-2 border rounded"
      />

      {/* Categories dropdown */}
      <select
        value={filters.category}
        onChange={(e) => updateFilters({ category: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {availableCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Sources dropdown */}
      <select
        value={filters.source}
        onChange={(e) => updateFilters({ source: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">All Sources</option>
        {availableSources.map((source) => (
          <option key={source.id} value={source.name}>
            {source.name}
          </option>
        ))}
      </select>

      {/* Date picker */}
      <input
        type="date"
        value={filters.from}
        onChange={(e) => updateFilters({ from: e.target.value })}
        className="p-2 border rounded"
      />
    </div>
  );
};

export default Filters;
