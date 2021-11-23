import { Tag } from 'antd';
import React from 'react';
import { TicketStatus } from '../../../../models/ticket.models';
import AutoCompleteInlineEdit from '../../../InlineEdit/AutCompleteInlineEdit/autocomplete-inline-edit';
import { TicketStatusItemProps } from './ticket-status-item.types';

const TicketStatusItem = React.memo<TicketStatusItemProps>(
  ({ ticket, statusOptions, onEditSubmit }) => {
    const renderStatusOptionView = (status: TicketStatus) => {
      return <Tag color="green">{status.name}</Tag>;
    };

    const getPossibleStatusOptions = () => {
      const currentStatusId = ticket.status.id;

      return (
        statusOptions.find((status) => status.id === currentStatusId)
          ?.transitionsFrom ?? []
      ).map((transition) => transition.nextStatus);
    };

    const getFilteredStatusOptions = (
      searchValue: string,
    ): Promise<TicketStatus[]> => {
      const possibleStatuses = getPossibleStatusOptions();

      return Promise.resolve(
        possibleStatuses.filter((status) => {
          return status.name.toLowerCase().includes(searchValue.toLowerCase());
        }),
      );
    };

    const getStatusDisplayValueFromOption = (status: TicketStatus) => {
      return status.name;
    };

    const onSelectStatus = (statusId: string) => {
      if (ticket.status.id !== statusId) {
        onEditSubmit(statusId);
      }
    };

    return (
      <AutoCompleteInlineEdit
        value={ticket.status}
        getOptionView={renderStatusOptionView}
        getFilteredOptions={getFilteredStatusOptions}
        getDisplayValue={getStatusDisplayValueFromOption}
        onSubmit={onSelectStatus}
      >
        {renderStatusOptionView(ticket.status)}
      </AutoCompleteInlineEdit>
    );
  },
);

TicketStatusItem.displayName = 'TicketStatusItem';

export default TicketStatusItem;
