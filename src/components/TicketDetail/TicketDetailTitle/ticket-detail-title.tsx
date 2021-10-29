import { Space } from 'antd';
import React from 'react';
import PageTitle from '../../PageTitle/page-title';
import { TicketDetailTitleProps } from './ticket-detail-title.types';

const TicketDetailTitle = React.memo<TicketDetailTitleProps>(({ ticket }) => {
  return (
    <PageTitle>
      <Space>
        <span className="ticket-issue-number">#{ticket.issueNumber}</span>
        <span>
          <span
            className={`ticket-type ${ticket.ticketType?.name.toLowerCase()}`}
          >
            [{ticket.ticketType?.name.toUpperCase()}]
          </span>{' '}
          {ticket.title}
        </span>
      </Space>
    </PageTitle>
  );
});

TicketDetailTitle.displayName = 'TicketDetailTitle';

export default TicketDetailTitle;
