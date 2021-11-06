import React from 'react';
import { Link } from 'react-router-dom';
import { UserLinkProps } from './user-link.types';

const UserLink = React.memo<UserLinkProps>(({ user }) => {
  return (
    <Link to={`/user/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>
  );
});

UserLink.displayName = 'UserLink';

export default UserLink;
