import { Tag } from 'antd';
import React from 'react';
import { TicketTypeTagProps } from './ticket-type-tag.types';

const TicketTypeTag = React.memo<TicketTypeTagProps>(({ name }) => {
  return <Tag color="purple">{name}</Tag>;
});

TicketTypeTag.displayName = 'TicketTypeTag';

export default TicketTypeTag;
