import api from './api';
import { setAuthToken, removeAuthToken } from '../utils/auth';

class AuthService {
//   async login(email, password) {
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       if (response.data.token) {
//         setAuthToken(response.data.token);
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   }

async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });

      console.log(response.responseBody)
      // Extract token and user from responseBody
      const { token, user } = response.responseBody;

      if (token && user) {
        return { token, user };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Handle backend validation or unexpected errors
      if (error.response) {
        const message =
          error.response.data.responseBody?.message || 'Login failed';
        throw new Error(message);
      } else {
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
    
      const {token, user} = response.responseBody;

      if (token) {
        setAuthToken(token);
      }
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async getUserFromToken() {
    try {
      const response = await api.get('/user/validate');

      console.log(response.responseBody)

      if (response.status !== 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      if (response.error) {
        throw new Error('Token validation failed.');
      }
  
      return response.responseBody;
    } catch (err) {
      console.error('Error in getUserFromToken:', err.message);
      throw err; 
    }
  }
  
  
  
  


  async logout() {
    try {
      await api.post('/auth/logout');
      removeAuthToken();
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if API call fails
      removeAuthToken();
      throw error;
    }
  }
}

export default new AuthService();