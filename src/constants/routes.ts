export interface RouteDescriptor {
  path: string;
  requiresAuthentication: boolean;
}

const Routes: { [key: string]: RouteDescriptor } = {
  Login: { path: '/login', requiresAuthentication: false },
  Overview: { path: '/overview', requiresAuthentication: true },
  Team: { path: '/team/:id', requiresAuthentication: true },
};

export default Routes;
