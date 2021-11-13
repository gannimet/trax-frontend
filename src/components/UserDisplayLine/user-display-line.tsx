import { Space } from 'antd';
import React from 'react';
import { getUserFullName } from '../../utils/display.utils';
import UserAvatar from '../UserAvatar/user-avatar';
import { UserDisplayLineProps } from './user-display-line.types';

const UserDisplayLine = React.memo<UserDisplayLineProps>(({ user }) => {
  return (
    <Space>
      <UserAvatar user={user} />
      <span>{getUserFullName(user)}</span>
    </Space>
  );
});

UserDisplayLine.displayName = 'UserDisplayLine';

export default UserDisplayLine;
