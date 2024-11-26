
export const setAuthToken = (token) => {
  if (token) {
    window.localStorage.setItem('token', token);
  }
};

export const removeAuthToken = () => {
  window.localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return window.localStorage.getItem('token');
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