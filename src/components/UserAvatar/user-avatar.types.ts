import { AvatarSize } from 'antd/lib/avatar/SizeContext';
import { User } from '../../models/user.models';

export interface UserAvatarProps {
  user: User;
  size?: AvatarSize;
}
