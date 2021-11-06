import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import UserLink from '../components/UserLink/user-link';
import { TicketEdit } from '../models/ticket.models';
import { User } from '../models/user.models';

dayjs.extend(RelativeTime);

export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;
};

export const formatDate = (
  rawDate: Date | string,
  format = 'YYYY-MM-DD HH:mm:ss',
): string => {
  return dayjs(rawDate).format(format);
};

export const formatRelativeDate = (rawDate: string | Date): string => {
  return dayjs(rawDate).fromNow();
};

export const getTicketEditingDescription = (
  edit: TicketEdit,
): React.ReactNode => {
  const { editor, field } = edit;
  const userLink = <UserLink user={editor} />;

  switch (field) {
    case 'TITLE':
    case 'DESCRIPTION':
    case 'ASSIGNEE':
    case 'STATUS':
    case 'TYPE':
    case 'ESTIMATE':
      return (
        <>
          {userLink} changed {field.toLowerCase()}
        </>
      );
    case 'SPRINT':
      return <>{userLink} moved ticket to different sprint</>;
    case 'ADD_TAG':
      return <>{userLink} added a tag</>;
    case 'REMOVE_TAG':
      return <>{userLink} removed a tag</>;
    default:
      return `${editor.firstName} ${editor.lastName}`;
  }
};
