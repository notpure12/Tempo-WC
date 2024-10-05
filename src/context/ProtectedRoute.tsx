// src/components/ProtectedRoute.tsx
import React from 'react';
import { Route, redirect } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const ProtectedRoute: React.FC<{ component: React.FC; path: string }> = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
