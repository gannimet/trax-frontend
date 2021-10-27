import { Space, Tag, Typography } from 'antd';
import React from 'react';
import './sprint-ticket-list-header.scss';
import { SprintTicketListHeaderProps } from './sprint-ticket-list-header.types';

const { Text } = Typography;

const SprintTicketListHeader = React.memo<SprintTicketListHeaderProps>(
  ({ sprint }) => {
    return (
      <div className="sprint-ticket-list-header-container">
        <Space>
          <Text strong>{sprint.name}</Text>
          {sprint.active && <Tag color="cyan">Active Sprint</Tag>}
          {sprint.description && (
            <Text
              className="description-text"
              type="secondary"
              ellipsis={{ tooltip: sprint.description }}
            >
              {sprint.description}
            </Text>
          )}
        </Space>
      </div>
    );
  },
);

SprintTicketListHeader.displayName = 'SprintTicketListHeader';

export default SprintTicketListHeader;
