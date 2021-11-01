import {
  Alert,
  Button,
  Col,
  Empty,
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
import TicketCommentBlock from '../../components/TicketCommentBlock/ticket-comment-block';
import TicketDetailTitle from '../../components/TicketDetail/TicketDetailTitle/ticket-detail-title';
import TicketEditsBlock from '../../components/TicketEditsBlock/ticket-edits-block';
import TicketMetaBlock from '../../components/TicketMetaBlock/ticket-meta-block';
import {
  TicketsActions,
  TicketsReducerAction,
} from '../../state/actions/tickets.actions';
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
  const dispatch: ThunkDispatch<StoreStateType, void, TicketsReducerAction> =
    useDispatch<Dispatch<TicketsReducerAction>>();
  const { ticket, ticketError, ticketLoading } = useSelector<
    StoreStateType,
    TicketsState
  >((state) => state.tickets);
  const { fetchTicketByIssueNumber, postTicketComment, editTicket } =
    new TicketsActions();

  useEffect(() => {
    dispatch(fetchTicketByIssueNumber(issueNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueNumber]);

  const onCommentSubmit = (values: { commentText: string }) => {
    if (!ticket) {
      return;
    }

    dispatch(postTicketComment(ticket?.id, values.commentText));
  };

  const onTestEditClick = () => {
    if (!ticket) {
      return;
    }

    dispatch(
      editTicket(
        ticket.id,
        'TITLE',
        '[FE/Solved] Loading error shown on teams page occasionally',
      ),
    );
  };

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

          <TicketMetaBlock ticket={ticket} />

          <Button onClick={onTestEditClick}>Editieren probieren</Button>

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
              <TicketEditsBlock edits={ticket.edits} />
            </TabPane>
          </Tabs>
        </Space>
      </>
    );
  };

  return <div className="ticket-container">{renderContent()}</div>;
};

export default TicketPage;
