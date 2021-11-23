import { Tag } from 'antd';
import React from 'react';
import { TicketTypeObj } from '../../../../models/ticket.models';
import AutocompleteInlineEdit from '../../../InlineEdit/AutCompleteInlineEdit/autocomplete-inline-edit';
import { TicketTypeItemProps } from './ticket-type-item.types';

const TicketTypeItem = React.memo<TicketTypeItemProps>(
  ({ ticket, onEditSubmit, convertibleTypes }) => {
    const renderTypeOptionView = (type: TicketTypeObj) => {
      return <Tag color="orange">{type.name}</Tag>;
    };

    const getFilteredTypeOptions = (
      searchValue: string,
    ): Promise<TicketTypeObj[]> => {
      return Promise.resolve(
        convertibleTypes.filter((type) => {
          return type.name.toLowerCase().includes(searchValue.toLowerCase());
        }),
      );
    };

    const getTypeDisplayValue = (type: TicketTypeObj) => {
      return type.name;
    };

    const onSelectType = (typeId: string) => {
      if (ticket.type.id !== typeId) {
        onEditSubmit(typeId);
      }
    };

    return (
      <AutocompleteInlineEdit
        value={ticket.type}
        getOptionView={renderTypeOptionView}
        getFilteredOptions={getFilteredTypeOptions}
        getDisplayValue={getTypeDisplayValue}
        onSubmit={onSelectType}
      >
        {renderTypeOptionView(ticket.type)}
      </AutocompleteInlineEdit>
    );
  },
);

TicketTypeItem.displayName = 'TicketTypeItem';

export default TicketTypeItem;
