import { Avatar } from 'antd';
import React from 'react';
import UserAvatar from '../UserAvatar/user-avatar';
import { AvatarListProps } from './avatar-list.types';

const AvatarList = React.memo<AvatarListProps>(({ users }) => {
  return (
    <Avatar.Group maxCount={5}>
      {users.map((user) => {
        return <UserAvatar key={user.id} user={user} />;
      })}
    </Avatar.Group>
  );
});

AvatarList.displayName = 'AvatarList';

export default AvatarList;
