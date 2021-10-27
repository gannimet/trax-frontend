import { Avatar } from 'antd';
import React from 'react';
import { getUserInitials } from '../../utils/display.utils';
import { AvatarListProps } from './avatar-list.types';

const AvatarList = React.memo<AvatarListProps>(({ users }) => {
  return (
    <Avatar.Group maxCount={5}>
      {users.map((user) => {
        return <Avatar key={user.id}>{getUserInitials(user)}</Avatar>;
      })}
    </Avatar.Group>
  );
});

AvatarList.displayName = 'AvatarList';

export default AvatarList;
