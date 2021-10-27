import { List, Space, Typography } from 'antd';
import React from 'react';
import './sprint-ticket-list-item.scss';
import { SprintTicketListItemProps } from './sprint-ticket-list-item.types';

const { Text } = Typography;

const SprintTicketListItem = React.memo<SprintTicketListItemProps>(
  ({ ticket }) => {
    return (
      <List.Item
        className={`sprint-ticket-list-item ${ticket.ticketType.name.toLowerCase()}`}
      >
        <div className="sprint-ticket-list-item__content">
          <Space>
            <Text>{ticket.issueNumber}</Text>
            <Text>{ticket.title}</Text>
          </Space>
        </div>
      </List.Item>
    );
  },
);

SprintTicketListItem.displayName = 'SprintTicketListItem';

export default SprintTicketListItem;
