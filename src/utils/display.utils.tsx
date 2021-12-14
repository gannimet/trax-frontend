import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import UserLink from '../components/UserLink/user-link';
import { AuthIdentity } from '../models/auth.models';
import { TicketEdit, TicketTag } from '../models/ticket.models';

dayjs.extend(RelativeTime);

export const getUserInitials = (user: AuthIdentity): string => {
  return `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;
};

export const getUserFullName = (user: AuthIdentity): string => {
  return `${user.firstName} ${user.lastName}`;
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
      return getUserFullName(editor);
  }
};

export const mergeTagsArrays = (
  arr1: TicketTag[],
  arr2: TicketTag[],
): TicketTag[] => {
  const result: TicketTag[] = [...arr1];

  arr2.forEach((tag) => {
    const foundInResult = !!result.find((item) => item.id === tag.id);

    if (!foundInResult) {
      result.push(tag);
    }
  });

  return result;
};
