// import React, { createContext, useState, useEffect } from 'react';
// import authService from '../services/authService';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const user = authService.getCurrentUser();
//     setCurrentUser(user);
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const user = await authService.login(email, password);
//       setCurrentUser(user);
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     authService.logout();
//     setCurrentUser(null);
//   };

//   const value = {
//     currentUser,
//     loading,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return React.useContext(AuthContext);
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Get stored user from localStorage on initial load
  const storedUser = localStorage.getItem('eduSyncUser');
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [loading, setLoading] = useState(true);

  // Effect to handle user persistence
  useEffect(() => {
    // Check if user is stored in localStorage
    const user = localStorage.getItem('eduSyncUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('eduSyncUser', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eduSyncUser');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;