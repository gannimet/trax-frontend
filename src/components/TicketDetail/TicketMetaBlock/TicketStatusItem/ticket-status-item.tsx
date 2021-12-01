import React from 'react';
import { TicketStatus } from '../../../../models/ticket.models';
import DropdownInlineEdit from '../../../InlineEdit/DropdownInlineEdit/dropdown-inline-edit';
import TicketStatusTag from '../../../TicketStatusTag/ticket-status-tag';
import { TicketStatusItemProps } from './ticket-status-item.types';

const TicketStatusItem = React.memo<TicketStatusItemProps>(
  ({ ticket, statusOptions, onEditSubmit }) => {
    const renderStatusOptionView = (status: TicketStatus) => {
      return <TicketStatusTag name={status.name} />;
    };

    const getPossibleStatusOptions = () => {
      const currentStatusId = ticket.status.id;

      return (
        statusOptions.find((status) => status.id === currentStatusId)
          ?.transitionsFrom ?? []
      ).map((transition) => transition.nextStatus);
    };

    const onSelectStatus = (statusId: string) => {
      if (ticket.status.id !== statusId) {
        onEditSubmit(statusId);
      }
    };

    const getLabelValue = (status: TicketStatus): string => {
      return status.name;
    };

    return (
      <DropdownInlineEdit
        value={null}
        options={getPossibleStatusOptions()}
        getOptionView={renderStatusOptionView}
        getLabelValue={getLabelValue}
        onSubmit={onSelectStatus}
        placeholder="Select new status"
      >
        {renderStatusOptionView(ticket.status)}
      </DropdownInlineEdit>
    );
  },
);

TicketStatusItem.displayName = 'TicketStatusItem';

export default TicketStatusItem;
