// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
  const currentUser = auth.currentUser;
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

