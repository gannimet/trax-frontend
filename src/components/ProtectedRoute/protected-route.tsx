import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default ProtectedRoute;
