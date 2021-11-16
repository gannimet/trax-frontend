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
import {
  ticketsStateEqualityFn,
  ticketStatusInfoStateEqualityFn,
} from '../../utils/state-utils';
import './ticket.page.scss';

interface TicketPageParams {
  issueNumber: string;
}

const { Paragraph, Title } = Typography;
const { TabPane } = Tabs;

const TicketPage = React.memo(
  () => {
    const { issueNumber } = useParams<TicketPageParams>();

    const dispatch: ThunkDispatch<
      StoreStateType,
      void,
      TicketsReducerAction | TicketStatusReducerAction
    > =
      useDispatch<Dispatch<TicketsReducerAction | TicketStatusReducerAction>>();

    const { ticket, ticketError, ticketLoading, editTicketError } = useSelector<
      StoreStateType,
      TicketsState
    >((state) => state.tickets, ticketsStateEqualityFn);
    const { ticketStatusInfo, ticketStatusLoading } = useSelector<
      StoreStateType,
      TicketStatusInfoState
    >((state) => state.ticketStatusInfo, ticketStatusInfoStateEqualityFn);

    const { fetchTicketByIssueNumber, postTicketComment, editTicket } =
      new TicketsActions();
    const { fetchTicketStatusTransitions } = new TicketStatusActions();

    const currentUserId = useCurrentUserId();

    useEffect(() => {
      dispatch(fetchTicketByIssueNumber(issueNumber));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issueNumber]);

    useEffect(() => {
      const teamId = ticket?.sprint?.team?.id;

      if (teamId) {
        dispatch(fetchTicketStatusTransitions(teamId));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticket?.id]);

    const onCommentSubmit = (values: {
      commentText: string;
    }): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        if (!ticket) {
          reject();

          return;
        }

        const hide = message.loading('Posting comment …');

        dispatch(postTicketComment(ticket?.id, values.commentText)).then(() => {
          hide();
          message.success('Comment posted successfully!', 2);
          resolve();
        }, reject);
      });
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
      dispatch(editTicket(ticket.id, field, atomicValue)).then(() => {
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
              allowEdits={canEditTickets}
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

            <Tabs>
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
  },
  () => true,
);

TicketPage.displayName = 'TicketPage';

export default TicketPage;
