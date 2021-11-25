import {
  Alert,
  Col,
  Empty,
  List,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import AvatarList from '../../components/AvatarList/avatar-list';
import PageTitle from '../../components/PageTitle/page-title';
import SprintTicketListFooter from '../../components/SprintTicketList/SprintTicketListFooter/sprint-ticket-list-footer';
import SprintTicketListHeader from '../../components/SprintTicketList/SprintTicketListHeader/sprint-ticket-list-header';
import SprintTicketListItem from '../../components/SprintTicketList/SprintTicketListItem/sprint-ticket-list-item';
import { NavigationContext } from '../../context/navigation.context';
import { Sprint } from '../../models/team.models';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../../state/actions/user-teams.actions';
import { UserTeamsState } from '../../state/reducers/user-teams.reducer';
import { StoreStateType } from '../../state/root.reducer';
import { getTeamBreadcrumbItems } from '../../utils/navigation.utils';
import './team.page.scss';

interface TeamPageParams {
  teamId: string;
}

const { Text } = Typography;

const TeamPage: React.FC = () => {
  const { teamId } = useParams<TeamPageParams>();
  const dispatch: ThunkDispatch<StoreStateType, void, UserTeamsReducerAction> =
    useDispatch<Dispatch<UserTeamsReducerAction>>();
  const { currentTeamInfos, currentTeamInfosError, currentTeamInfosLoading } =
    useSelector<StoreStateType, UserTeamsState>((state) => state.userTeams);
  const { fetchTeamDetailsOfUser } = new UserTeamsActions();
  const navigationContext = useContext(NavigationContext);

  useEffect(() => {
    dispatch(fetchTeamDetailsOfUser(teamId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  useEffect(() => {
    navigationContext.setNavigationItems(
      getTeamBreadcrumbItems(currentTeamInfos?.team),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTeamInfos?.team.id]);

  const renderContent = () => {
    if (currentTeamInfosLoading) {
      return <Skeleton />;
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
    if (!currentTeamInfos) {
      return null;
    }

    const { team } = currentTeamInfos;
    const { users, sprints } = team;
    const hasSprints = !!sprints && sprints.length > 0;

    return (
      <>
        <Row align="middle" justify="space-between">
          <Col xs={12} sm={16} md={20}>
            <PageTitle>{team.name}</PageTitle>
          </Col>
          <Col xs={12} sm={8} md={4} style={{ textAlign: 'right' }}>
            {users && <AvatarList users={users} />}
          </Col>
        </Row>

        {team.description && (
          <Row className="description-row">
            <Col span={24}>
              <Text type="secondary">{team.description}</Text>
            </Col>
          </Row>
        )}

        <Row>
          <Col span={24}>{hasSprints && renderSprints(sprints)}</Col>

          <Col span={24}>
            {!hasSprints && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No sprints have been created for this team yet."
              />
            )}
          </Col>
        </Row>
      </>
    );
  };

  const renderSprints = (sprints: Sprint[]) => {
    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {sprints.map((sprint) => {
          return (
            <List
              key={sprint.id}
              bordered
              header={<SprintTicketListHeader sprint={sprint} />}
              footer={<SprintTicketListFooter sprint={sprint} />}
              locale={{ emptyText: 'No tickets in this sprint yet.' }}
              dataSource={sprint.tickets}
              renderItem={(ticket) => {
                return <SprintTicketListItem ticket={ticket} />;
              }}
            />
          );
        })}
      </Space>
    );
  };

  return <div className="team-container">{renderContent()}</div>;
};

export default TeamPage;
