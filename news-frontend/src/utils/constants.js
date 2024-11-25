export const sources = [
    { id: 'newsapi', name: 'NewsAPI' },
    { id: 'guardian', name: 'The Guardian' },
    { id: 'nyt', name: 'New York Times' },
    // { id: 'bbc', name: 'BBC News' },
    // { id: 'opennews', name: 'OpenNews' }
  ];
  
  export const categories = [
    'Business',
    'Technology',
    'Sports',
    'Entertainment',
    'Health',
    'Science',
    'Politics',
    'World'
  ];
  
  export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ARTICLES: '/articles',
    SOURCES: '/sources',
    CATEGORIES: '/categories',
    PREFERENCES: '/preferences'
  };
  
  export const availableCategories = categories;
  export const availableSources = sources;