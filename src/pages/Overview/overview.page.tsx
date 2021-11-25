import { Alert, Card, Col, Empty, List, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PageTitle from '../../components/PageTitle/page-title';
import { NavigationContext } from '../../context/navigation.context';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../../state/actions/user-teams.actions';
import { UserTeamsState } from '../../state/reducers/user-teams.reducer';
import { StoreStateType } from '../../state/root.reducer';
import { getHomeBreadcrumbItems } from '../../utils/navigation.utils';

const OverviewPage: React.FC = () => {
  const dispatch: ThunkDispatch<StoreStateType, void, UserTeamsReducerAction> =
    useDispatch<Dispatch<UserTeamsReducerAction>>();
  const { allTeamsInfos, allTeamsInfosError } = useSelector<
    StoreStateType,
    UserTeamsState
  >((state) => state.userTeams);
  const navigationContext = useContext(NavigationContext);

  const { fetchTeamsOfUser } = new UserTeamsActions();

  useEffect(() => {
    dispatch(fetchTeamsOfUser());
    navigationContext.setNavigationItems(getHomeBreadcrumbItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasTeams = allTeamsInfos && allTeamsInfos.length > 0;

  return (
    <div className="overview-container">
      <PageTitle>Welcome to Trax!</PageTitle>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card title="Your teams">
            {hasTeams && (
              <List
                size="small"
                dataSource={allTeamsInfos}
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

            {!hasTeams && !allTeamsInfosError && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Looks like you&#39;re not part of any teams yet."
              />
            )}

            {allTeamsInfosError && (
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
