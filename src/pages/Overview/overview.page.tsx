import { Alert, Card, Col, Empty, List, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PageTitle from '../../components/PageTitle/page-title';
import { useAuthState } from '../../hooks/use-auth';
import {
  UserReducerAction,
  UserTeamsActions,
} from '../../state/actions/user-teams.actions';
import { UserTeamsState } from '../../state/reducers/user-teams.reducer';
import { StoreStateType } from '../../state/root.reducer';

const OverviewPage: React.FC = () => {
  const dispatch: ThunkDispatch<StoreStateType, void, UserReducerAction> =
    useDispatch<Dispatch<UserReducerAction>>();
  const authState = useAuthState();
  const { teamsInfos, error: teamsInfosError } = useSelector<
    StoreStateType,
    UserTeamsState
  >((state) => state.userTeams);

  const { fetchTeamsOfUser } = new UserTeamsActions();

  useEffect(() => {
    if (authState.authenticationInfo?.tokenContents.id) {
      dispatch(
        fetchTeamsOfUser(authState.authenticationInfo?.tokenContents.id),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasTeams = teamsInfos && teamsInfos.length > 0;

  return (
    <div className="overview-container">
      <PageTitle>Welcome to Trax!</PageTitle>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card title="Your teams">
            {hasTeams && (
              <List
                size="small"
                dataSource={teamsInfos}
                renderItem={(teamsInfo) => {
                  return (
                    <List.Item key={teamsInfo.team.id}>
                      <Link to={`/team/${teamsInfo.team.id}`}>
                        {teamsInfo.team.name}
                      </Link>
                    </List.Item>
                  );
                }}
              ></List>
            )}

            {!hasTeams && !teamsInfosError && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Looks like you&#39;re not part of any teams yet."
              />
            )}

            {teamsInfosError && (
              <Alert
                message="The list of teams could not be loaded at this time."
                type="error"
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewPage;
