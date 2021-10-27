import { Typography } from 'antd';
import React from 'react';
import './sprint-ticket-list-footer.scss';
import { SprintTicketListFooterProps } from './sprint-ticket-list-footer.types';

const { Text } = Typography;

const SprintTicketListFooter = React.memo<SprintTicketListFooterProps>(
  ({ sprint }) => {
    return (
      <div className="sprint-ticket-list-footer-container">
        <Text strong>{sprint.tickets.length} tickets total</Text>
      </div>
    );
  },
);

SprintTicketListFooter.displayName = 'SprintTicketListFooter';

export default SprintTicketListFooter;
