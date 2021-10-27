import { User } from '../models/team.models';

export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;
};
