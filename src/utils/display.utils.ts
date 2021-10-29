import dayjs from 'dayjs';
import { User } from '../models/user.models';

export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;
};

export const formatDate = (
  rawDate: Date | string,
  format = 'YYYY-MM-DD, hh:mm a',
): string => {
  return dayjs(rawDate).format(format);
};
