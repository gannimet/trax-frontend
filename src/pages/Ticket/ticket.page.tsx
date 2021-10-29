import {
  Alert,
  Col,
  Descriptions,
  Empty,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import EstimateBadge from '../../components/EstimateBadge/estimate-badge';
import TagList from '../../components/TagList/tag-list';
import TicketDetailTitle from '../../components/TicketDetail/TicketDetailTitle/ticket-detail-title';
import UserAvatar from '../../components/UserAvatar/user-avatar';
import {
  TicketsActions,
  TicketsReducerAction,
} from '../../state/actions/tickets.actions';
import { TicketsState } from '../../state/reducers/tickets.reducer';
import { StoreStateType } from '../../state/root.reducer';
import { formatDate } from '../../utils/display.utils';
import './ticket.page.scss';

interface TicketPageParams {
  issueNumber: string;
}

const { Paragraph } = Typography;

const TicketPage: React.FC = () => {
  const { issueNumber } = useParams<TicketPageParams>();
  const dispatch: ThunkDispatch<StoreStateType, void, TicketsReducerAction> =
    useDispatch<Dispatch<TicketsReducerAction>>();
  const { ticket, ticketError, ticketLoading } = useSelector<
    StoreStateType,
    TicketsState
  >((state) => state.tickets);
  const { fetchTicketByIssueNumber } = new TicketsActions();

  useEffect(() => {
    dispatch(fetchTicketByIssueNumber(issueNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueNumber]);

  const renderContent = () => {
    if (ticketLoading) {
      return <Skeleton />;
    }

    if (ticketError) {
      return (
        <Alert
          type="error"
          message="Ticket details could not be loaded at this time."
        />
      );
    }

    return renderTicketDetails();
  };

  const renderTicketDetails = () => {
    if (!ticket) {
      return null;
    }

    return (
      <>
        <TicketDetailTitle ticket={ticket} />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {ticket.tags && ticket.tags.length > 0 && (
            <Row>
              <Col span={24}>
                <TagList tags={ticket.tags} />
              </Col>
            </Row>
          )}

          <Descriptions bordered column={{ xxl: 2, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Created At">
              {formatDate(ticket.createdAt)}
            </Descriptions.Item>

            <Descriptions.Item label="Estimate">
              {ticket.estimate != null && (
                <EstimateBadge value={ticket.estimate} />
              )}
              {ticket.estimate == null && 'No estimate yet'}
            </Descriptions.Item>

            <Descriptions.Item label="Author">
              <Space>
                <UserAvatar user={ticket.author} />
                <span>
                  {ticket.author.firstName} {ticket.author.lastName}
                </span>
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Assignee">
              {ticket.assignee && (
                <Space>
                  <UserAvatar user={ticket.assignee} />
                  <span>
                    {ticket.assignee.firstName} {ticket.assignee.lastName}
                  </span>
                </Space>
              )}
              {!ticket.assignee && 'Unassigned'}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              <Tag color="green">{ticket.status.name}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Ticket type">
              {ticket.ticketType.name}
            </Descriptions.Item>
          </Descriptions>

          <Paragraph>
            {ticket.description ?? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No description"
              />
            )}
          </Paragraph>
        </Space>
      </>
    );
  };

  return <div className="ticket-container">{renderContent()}</div>;
};

export default TicketPage;
