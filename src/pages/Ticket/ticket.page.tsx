import { Alert, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import TicketDetailTitle from '../../components/TicketDetail/TicketDetailTitle/ticket-detail-title';
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
      </>
    );
  };

  return <div className="ticket-container">{renderContent()}</div>;
};

export default TicketPage;
