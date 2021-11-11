import {
  Alert,
  Col,
  Empty,
  message,
  Row,
  Skeleton,
  Space,
  Tabs,
  Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import TagList from '../../components/TagList/tag-list';
import TicketCommentBlock from '../../components/TicketDetail/TicketCommentBlock/ticket-comment-block';
import TicketDetailTitle from '../../components/TicketDetail/TicketDetailTitle/ticket-detail-title';
import TicketEditsBlock from '../../components/TicketDetail/TicketEditsBlock/ticket-edits-block';
import TicketMetaBlock from '../../components/TicketDetail/TicketMetaBlock/ticket-meta-block';
import { useCurrentUserId } from '../../hooks/use-auth';
import {
  TicketEditField,
  TicketStatus,
  TicketType,
} from '../../models/ticket.models';
import { User } from '../../models/user.models';
import {
  TicketStatusActions,
  TicketStatusReducerAction,
} from '../../state/actions/ticket-status.actions';
import {
  TicketsActions,
  TicketsReducerAction,
} from '../../state/actions/tickets.actions';
import { TicketStatusInfoState } from '../../state/reducers/ticket-status.reducer';
import { TicketsState } from '../../state/reducers/tickets.reducer';
import { StoreStateType } from '../../state/root.reducer';
import './ticket.page.scss';

interface TicketPageParams {
  issueNumber: string;
}

const { Paragraph, Title } = Typography;
const { TabPane } = Tabs;

const TicketPage: React.FC = () => {
  const { issueNumber } = useParams<TicketPageParams>();
  const ticketDispatch: ThunkDispatch<
    StoreStateType,
    void,
    TicketsReducerAction
  > = useDispatch<Dispatch<TicketsReducerAction>>();
  const ticketStatusDispatch: ThunkDispatch<
    StoreStateType,
    void,
    TicketStatusReducerAction
  > = useDispatch<Dispatch<TicketStatusReducerAction>>();
  const { ticket, ticketError, ticketLoading, editTicketError } = useSelector<
    StoreStateType,
    TicketsState
  >((state) => state.tickets);
  const { ticketStatusInfo, ticketStatusLoading } = useSelector<
    StoreStateType,
    TicketStatusInfoState
  >((state) => state.ticketStatusInfo);
  const { fetchTicketByIssueNumber, postTicketComment, editTicket } =
    new TicketsActions();
  const { fetchTicketStatusTransitions } = new TicketStatusActions();
  const currentUserId = useCurrentUserId();

  useEffect(() => {
    ticketDispatch(fetchTicketByIssueNumber(issueNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueNumber]);

  useEffect(() => {
    const teamId = ticket?.sprint?.team?.id;

    if (teamId) {
      ticketStatusDispatch(fetchTicketStatusTransitions(teamId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket]);

  const onCommentSubmit = (values: { commentText: string }) => {
    if (!ticket) {
      return;
    }

    const hide = message.loading('Posting comment …');
    ticketDispatch(postTicketComment(ticket?.id, values.commentText)).then(
      () => {
        hide();
        message.success('Comment posted successfully!', 2);
      },
    );
  };

  const onFieldEdited = (
    field: TicketEditField,
    value:
      | number
      | string
      | User
      | TicketStatus
      | TicketType
      | null
      | undefined,
  ) => {
    if (!ticket) {
      return;
    }

    let atomicValue: string | number | undefined | null;

    if (typeof value === 'number' || typeof value === 'string') {
      atomicValue = value;
    } else if (value?.id) {
      atomicValue = value.id;
    }

    const hide = message.loading('Saving ...');
    ticketDispatch(editTicket(ticket.id, field, atomicValue)).then(() => {
      hide();

      if (editTicketError) {
        message.error('An error occured.');
      } else {
        message.success('Saved.');
      }
    });
  };

  const renderContent = () => {
    if (ticketLoading || ticketStatusLoading) {
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
    if (!ticket || !ticketStatusInfo) {
      return null;
    }

    const canEditTickets =
      ticket.sprint?.team?.users?.find((user) => user.id === currentUserId)
        ?.TeamUser?.canEditTickets ?? false;

    return (
      <>
        <TicketDetailTitle
          ticket={ticket}
          allowEdits={canEditTickets}
          onTitleEdit={(newTitle) => onFieldEdited('TITLE', newTitle)}
        />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {ticket.tags && ticket.tags.length > 0 && (
            <Row>
              <Col span={24}>
                <TagList tags={ticket.tags} />
              </Col>
            </Row>
          )}

          <TicketMetaBlock
            ticket={ticket}
            statusInfo={ticketStatusInfo}
            alloweEdits={canEditTickets}
            onEditSubmit={onFieldEdited}
          />

          <div className="description-block">
            <Title level={5}>Description</Title>

            <Paragraph>
              {ticket.description ?? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No description"
                />
              )}
            </Paragraph>
          </div>

          <Tabs defaultActiveKey="comments">
            <TabPane tab="Comments" key="comments">
              <TicketCommentBlock
                comments={ticket.comments}
                onCommentSubmit={onCommentSubmit}
              />
            </TabPane>
            <TabPane tab="History" key="edits">
              <TicketEditsBlock ticket={ticket} />
            </TabPane>
          </Tabs>
        </Space>
      </>
    );
  };

  return <div className="ticket-container">{renderContent()}</div>;
};

export default TicketPage;
