import React from 'react';
import { TicketTypeObj } from '../../../../models/ticket.models';
import DropdownInlineEdit from '../../../InlineEdit/DropdownInlineEdit/dropdown-inline-edit';
import TicketTypeTag from '../../../TicketTypeTag/ticket-type-tag';
import { TicketTypeItemProps } from './ticket-type-item.types';

const TicketTypeItem = React.memo<TicketTypeItemProps>(
  ({ ticket, onEditSubmit, convertibleTypes }) => {
    const renderTypeOptionView = (type: TicketTypeObj) => {
      return <TicketTypeTag name={type.name} />;
    };

    const getLabelValue = (type: TicketTypeObj) => {
      return type.name;
    };

    const onSelectType = (typeId: string) => {
      if (ticket.type.id !== typeId) {
        onEditSubmit(typeId);
      }
    };

    return (
      <DropdownInlineEdit
        value={ticket.type}
        options={convertibleTypes}
        getOptionView={renderTypeOptionView}
        getLabelValue={getLabelValue}
        onSubmit={onSelectType}
      >
        {renderTypeOptionView(ticket.type)}
      </DropdownInlineEdit>
    );
  },
);

TicketTypeItem.displayName = 'TicketTypeItem';

export default TicketTypeItem;
