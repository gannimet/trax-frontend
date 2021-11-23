import { ArrowRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import TicketTypeTag from '../../../TicketTypeTag/ticket-type-tag';
import { TypeEditContentProps } from './type-edit-content.types';

const TypeEditContent = React.memo<TypeEditContentProps>(({ edit }) => {
  return (
    <Space>
      Previously:
      {edit.previousType?.name && (
        <TicketTypeTag name={edit.previousType.name} />
      )}
      <ArrowRightOutlined />
      Now:
      {edit.newType?.name && <TicketTypeTag name={edit.newType.name} />}
    </Space>
  );
});

TypeEditContent.displayName = 'TypeEditContent';

export default TypeEditContent;
