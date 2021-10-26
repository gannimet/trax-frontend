import { useSelector } from 'react-redux';
import { AuthState } from '../state/reducers/auth.reducer';
import { StoreStateType } from '../state/root.reducer';

export const useAuthState = (): AuthState => {
  return useSelector<StoreStateType, AuthState>((state) => state.auth);
};

export const useCurrentUserId = (): string | undefined => {
  return useSelector<StoreStateType, string | undefined>(
    (state) => state.auth.authenticationInfo?.tokenContents.id,
  );
};
