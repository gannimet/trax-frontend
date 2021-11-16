import { Descriptions, Tag } from 'antd';
import React from 'react';
import { formatDate } from '../../../utils/display.utils';
import EstimateBadge from '../../EstimateBadge/estimate-badge';
import TextInlineEdit from '../../InlineEdit/TextInlineEdit/text-inline-edit';
import UserDisplayLine from '../../UserDisplayLine/user-display-line';
import { TicketMetaBlockProps } from './ticket-meta-block.types';
import TicketAssigneeItem from './TicketAssigneeItem/ticket-assignee-item';

const TicketMetaBlock = React.memo<TicketMetaBlockProps>(
  ({ ticket, statusInfo, onEditSubmit, allowEdits }) => {
    return (
      <Descriptions
        bordered
        column={{ xl: 2, md: 1, sm: 1, xs: 1 }}
        labelStyle={{ width: '200px' }}
        contentStyle={{ width: '35%' }}
      >
        <Descriptions.Item label="Created At">
          {formatDate(ticket.createdAt)}
        </Descriptions.Item>

        <Descriptions.Item label="Estimate">
          <TextInlineEdit
            value={ticket.estimate}
            isNumeric
            allowEdits={allowEdits}
            onSubmit={(value) => {
              onEditSubmit('ESTIMATE', value);
            }}
          >
            {ticket.estimate != null && (
              <EstimateBadge value={ticket.estimate} />
            )}
            {ticket.estimate == null && 'Not estimated yet'}
          </TextInlineEdit>
        </Descriptions.Item>

        <Descriptions.Item label="Author">
          <UserDisplayLine user={ticket.author} />
        </Descriptions.Item>

        <Descriptions.Item label="Assignee">
          <TicketAssigneeItem ticket={ticket} onEditSubmit={onEditSubmit} />
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <Tag color="green">{ticket.status.name}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Ticket type">
          {ticket.type.name}
        </Descriptions.Item>
      </Descriptions>
    );
  },
);

TicketMetaBlock.displayName = 'TicketMetaBlock';

export default TicketMetaBlock;
