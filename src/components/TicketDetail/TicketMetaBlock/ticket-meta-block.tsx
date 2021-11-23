import { Descriptions } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React from 'react';
import { formatDate } from '../../../utils/display.utils';
import EstimateBadge from '../../EstimateBadge/estimate-badge';
import TextInlineEdit from '../../InlineEdit/TextInlineEdit/text-inline-edit';
import UserDisplayLine from '../../UserDisplayLine/user-display-line';
import { TicketMetaBlockProps } from './ticket-meta-block.types';
import TicketAssigneeItem from './TicketAssigneeItem/ticket-assignee-item';
import TicketStatusItem from './TicketStatusItem/ticket-status-item';
import TicketTypeItem from './TicketTypeItem/ticket-type-item';

const TicketMetaBlock = React.memo<TicketMetaBlockProps>(
  ({ ticket, statusInfo, convertibleTypes, onEditSubmit, allowEdits }) => {
    const screens = useBreakpoint();

    return (
      <Descriptions
        bordered
        column={{ xl: 2, md: 1, sm: 1, xs: 1 }}
        labelStyle={{ width: '200px' }}
        contentStyle={screens.sm ? {} : { width: '35%' }}
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
          <TicketAssigneeItem
            ticket={ticket}
            onEditSubmit={(value) => onEditSubmit('ASSIGNEE', value)}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <TicketStatusItem
            ticket={ticket}
            onEditSubmit={(value) => onEditSubmit('STATUS', value)}
            statusOptions={statusInfo}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Ticket type">
          <TicketTypeItem
            ticket={ticket}
            onEditSubmit={(value) => onEditSubmit('TYPE', value)}
            convertibleTypes={convertibleTypes}
          />
        </Descriptions.Item>
      </Descriptions>
    );
  },
);

TicketMetaBlock.displayName = 'TicketMetaBlock';

export default TicketMetaBlock;
