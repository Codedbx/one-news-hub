import { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { debounce } from '../../utils/helpers';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { updateFilters } = useNews();

  const debouncedSearch = debounce((term) => {
    updateFilters({ keyword: term });
  }, 500);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="relative max-w-xl mx-auto">
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Search news articles..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;