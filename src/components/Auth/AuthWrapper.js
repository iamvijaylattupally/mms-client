import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext.js';

const AuthWrapper = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Optionally display a loading indicator
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthWrapper;
