import React from 'react';
import TextInlineEdit from '../../InlineEdit/TextInlineEdit/text-inline-edit';
import PageTitle from '../../PageTitle/page-title';
import './ticket-detail-title.scss';
import { TicketDetailTitleProps } from './ticket-detail-title.types';

const TicketDetailTitle = React.memo<TicketDetailTitleProps>(
  ({ ticket, onTitleEdit }) => {
    return (
      <PageTitle>
        <div className="ticket-title-container">
          <span className="ticket-issue-number">#{ticket.issueNumber}</span>
          <span className={`ticket-type ${ticket.type?.name.toLowerCase()}`}>
            [{ticket.type?.name.toUpperCase()}]
          </span>
          <TextInlineEdit
            className="title-text"
            value={ticket.title}
            onSubmit={onTitleEdit}
          >
            {ticket.title}
          </TextInlineEdit>
        </div>
      </PageTitle>
    );
  },
);

TicketDetailTitle.displayName = 'TicketDetailTitle';

export default TicketDetailTitle;
