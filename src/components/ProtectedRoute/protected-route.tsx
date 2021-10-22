import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const authService = new AuthService();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authService.isAuthenticated() ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
