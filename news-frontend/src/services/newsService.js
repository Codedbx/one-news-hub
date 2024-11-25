import api from './api';

const newsService = {
  getArticles: async (filters) => {
    try {
      const queryParams = new URLSearchParams();

      // Add filters to query parameters
      if (filters.q) queryParams.append('q', filters.q);

      // Handle categories array
      if (filters.categories && Array.isArray(filters.categories)) {
        filters.categories.forEach((category) => queryParams.append('categories[]', category));
      }

      // Handle authors array
      if (filters.authors && Array.isArray(filters.authors)) {
        filters.authors.forEach((author) => queryParams.append('authors[]', author));
      }

      if (filters.from) queryParams.append('from', filters.from);
      if (filters.page) queryParams.append('page', filters.page);

      if (filters.sources && Array.isArray(filters.sources)) {
        filters.sources.forEach((source) => queryParams.append('sources[]', source));
      }

      console.log(`Requesting: /search-articles?${queryParams.toString()}`);

      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.get(`/search-articles?${queryParams.toString()}`);

      if (!response.responseBody) {
        throw new Error('Invalid API response format: responseBody is missing');
      }
      console.log(response.responseBody); 
      return response.responseBody;

    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else {
        console.error('Network or Unknown Error:', error.message);
      }
      throw error;
    }
  },

  // Uncomment these methods if needed
  // getSources: async () => {
  //   try {
  //     const response = await api.get('/sources');
  //     return response.responseBody; // Adjusted for your response format
  //   } catch (error) {
  //     console.error('Error fetching sources:', error);
  //     throw error;
  //   }
  // },

  getPreference: async () => {
    try {
      const response = await api.get('/preferences');
      return response.responseBody; 
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  savePreference: async (preferences) => {
    try {
      const response = await api.post('/preferences', preferences);

      console.log(`Testing the preference ${preferences}`);
      return response.responseBody; // Adjusted for your response format
    } catch (error) {
      console.error('Error saving article:', error);
      throw error;
    }
  },
};

export default newsService;
