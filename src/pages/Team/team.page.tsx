import { Alert, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PageTitle from '../../components/PageTitle/page-title';
import { useCurrentUserId } from '../../hooks/use-auth';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../../state/actions/user-teams.actions';
import { UserTeamsState } from '../../state/reducers/user-teams.reducer';
import { StoreStateType } from '../../state/root.reducer';

interface TeamPageParams {
  teamId: string;
}

const TeamPage: React.FC = () => {
  const { teamId } = useParams<TeamPageParams>();
  const dispatch: ThunkDispatch<StoreStateType, void, UserTeamsReducerAction> =
    useDispatch<Dispatch<UserTeamsReducerAction>>();
  const currentUserId = useCurrentUserId();
  const { currentTeamInfos, currentTeamInfosError, currentTeamInfosLoading } =
    useSelector<StoreStateType, UserTeamsState>((state) => state.userTeams);
  const { fetchTeamDetailsOfUser } = new UserTeamsActions();

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchTeamDetailsOfUser(currentUserId, teamId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const renderContent = () => {
    if (currentTeamInfosLoading) {
      return <Spin size="large" />;
    }

    if (currentTeamInfosError) {
      return (
        <Alert
          type="error"
          message="Team details could not be loaded at this time."
        />
      );
    }

    return renderTeamDetails();
  };

  const renderTeamDetails = () => {
    return <PageTitle>{currentTeamInfos?.team.name}</PageTitle>;
  };

  return <div className="team-container">{renderContent()}</div>;
};

export default TeamPage;
