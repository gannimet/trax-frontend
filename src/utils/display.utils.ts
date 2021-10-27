import { User } from '../models/user.models';

export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;
};
