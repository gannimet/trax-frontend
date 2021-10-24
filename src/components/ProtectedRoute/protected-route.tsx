import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthState } from '../../hooks/use-auth';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const authState = useAuthState();

  return authState.isAuthenticated ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default ProtectedRoute;
