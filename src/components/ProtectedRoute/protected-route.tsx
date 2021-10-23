import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { StoreStateType } from '../../state/root.reducer';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = useSelector<StoreStateType, boolean>(
    (state) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default ProtectedRoute;
