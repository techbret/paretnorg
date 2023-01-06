import React from 'react';
import NavBar from '../components/Navbar';
import { UserAuth } from '../context/AuthContext';

const NonUserRoutes = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <NavBar />;
  }
  return children;
};

export default NonUserRoutes;