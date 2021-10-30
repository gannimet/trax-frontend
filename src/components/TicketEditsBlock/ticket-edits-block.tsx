import { Typography } from 'antd';
import React from 'react';
import { TicketEditsBlockProps } from './ticket-edits-block.types';

const { Title } = Typography;

const TicketEditsBlock = React.memo<TicketEditsBlockProps>(({ edits }) => {
  return (
    <div className="edits-block-container">
      <Title level={5}>{edits.length} Edits</Title>
    </div>
  );
});

TicketEditsBlock.displayName = 'TicketEditsBlock';

export default TicketEditsBlock;
