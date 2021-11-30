import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../state/actions/user-teams.actions';
import { UserTeamsState } from '../state/reducers/user-teams.reducer';
import { StoreStateType } from '../state/root.reducer';
import { useCurrentUserId } from './use-auth';

let teamsUserId: string | undefined;

export const useUserTeams = (): UserTeamsState => {
  const state = useSelector<StoreStateType, UserTeamsState>(
    (state) => state.userTeams,
  );
  const { allTeamsInfos } = state;

  const dispatch: ThunkDispatch<StoreStateType, void, UserTeamsReducerAction> =
    useDispatch<Dispatch<UserTeamsReducerAction>>();

  const userId = useCurrentUserId();

  const { fetchTeamsOfUser } = new UserTeamsActions();

  useEffect(() => {
    if (!allTeamsInfos || userId !== teamsUserId) {
      dispatch(fetchTeamsOfUser());
      teamsUserId = userId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return state;
};
