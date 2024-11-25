
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// // types/auth.types.js
// export interface UserData {
//   email: string;
//   password: string;
//   firstName?: string;
//   lastName?: string;
// }

// export interface AuthResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     firstName?: string;
//     lastName?: string;
//   };
// }