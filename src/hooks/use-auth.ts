import { useSelector } from 'react-redux';
import { StoreStateType } from '../state/root.reducer';

export const useAuth = (): boolean => {
  return useSelector<StoreStateType, boolean>(
    (state) => state.auth.isAuthenticated,
  );
};
