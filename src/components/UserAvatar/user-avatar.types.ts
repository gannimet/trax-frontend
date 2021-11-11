import { AvatarSize } from 'antd/lib/avatar/SizeContext';
import { AuthIdentity } from '../../models/auth.models';

export interface UserAvatarProps {
  user: AuthIdentity;
  size?: AvatarSize;
}
