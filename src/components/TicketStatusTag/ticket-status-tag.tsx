import { Tag } from 'antd';
import React from 'react';
import { TicketStatusTagProps } from './ticket-status-tag.types';

const TicketStatusTag = React.memo<TicketStatusTagProps>(({ name }) => {
  return <Tag color="green">{name}</Tag>;
});

TicketStatusTag.displayName = 'TicketStatusTag';

export default TicketStatusTag;
