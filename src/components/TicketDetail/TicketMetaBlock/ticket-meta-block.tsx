import { Descriptions, Space, Tag } from 'antd';
import React from 'react';
import { TicketStatus } from '../../../models/ticket.models';
import { formatDate } from '../../../utils/display.utils';
import EstimateBadge from '../../EstimateBadge/estimate-badge';
import AutoCompleteInlineEdit from '../../InlineEdit/AutCompleteInlineEdit/autocomplete-inline-edit';
import TextInlineEdit from '../../InlineEdit/TextInlineEdit/text-inline-edit';
import UserAvatar from '../../UserAvatar/user-avatar';
import { TicketMetaBlockProps } from './ticket-meta-block.types';

const TicketMetaBlock = React.memo<TicketMetaBlockProps>(
  ({ ticket, statusInfo, onEditSubmit, alloweEdits }) => {
    const renderStatusOptionView = (option: TicketStatus) => {
      return <Tag color="green">{option.name}</Tag>;
    };

    const getFilteredStatusOptions = (
      searchValue: string,
    ): Promise<TicketStatus[]> => {
      return new Promise((resolve) => {
        const options = statusInfo.filter((option) =>
          option.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
        resolve(options);
      });
    };

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
            allowEdits={alloweEdits}
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
          <Space>
            <UserAvatar user={ticket.author} />
            <span>
              {ticket.author.firstName} {ticket.author.lastName}
            </span>
          </Space>
        </Descriptions.Item>

        <Descriptions.Item label="Assignee">
          {ticket.assignee && (
            <Space>
              <UserAvatar user={ticket.assignee} />
              <span>
                {ticket.assignee.firstName} {ticket.assignee.lastName}
              </span>
            </Space>
          )}
          {!ticket.assignee && 'Unassigned'}
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <AutoCompleteInlineEdit
            value={ticket.status}
            getOptionView={renderStatusOptionView}
            getFilteredOptions={getFilteredStatusOptions}
          >
            <Tag color="green">{ticket.status.name}</Tag>
          </AutoCompleteInlineEdit>
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
