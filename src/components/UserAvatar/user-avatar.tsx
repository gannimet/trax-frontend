import { Avatar } from 'antd';
import React from 'react';
import { getUserInitials } from '../../utils/display.utils';
import { UserAvatarProps } from './user-avatar.types';

const UserAvatar = React.memo<UserAvatarProps>(({ user, size = 'default' }) => {
  const src = user.avatar
    ? `http://localhost:4000/images/users/${user.avatar}`
    : null;

  return (
    <Avatar size={size} src={src}>
      {getUserInitials(user)}
    </Avatar>
  );
});

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
