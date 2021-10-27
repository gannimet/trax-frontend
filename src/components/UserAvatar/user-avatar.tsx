import { Avatar } from 'antd';
import React from 'react';
import { getUserInitials } from '../../utils/display.utils';
import { UserAvatarProps } from './user-avatar.types';

const UserAvatar = React.memo<UserAvatarProps>(({ user, size = 'default' }) => {
  return <Avatar size={size}>{getUserInitials(user)}</Avatar>;
});

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
