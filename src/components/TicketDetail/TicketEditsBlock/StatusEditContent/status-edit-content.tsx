import { ArrowRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import TicketStatusTag from '../../../TicketStatusTag/ticket-status-tag';
import { StatusEditContentProps } from './status-edit-content.types';

const StatusEditContent = React.memo<StatusEditContentProps>(({ edit }) => {
  return (
    <Space>
      Previously:
      {edit.previousStatus?.name && (
        <TicketStatusTag name={edit.previousStatus.name} />
      )}
      <ArrowRightOutlined />
      Now:
      {edit.newStatus?.name && <TicketStatusTag name={edit.newStatus.name} />}
    </Space>
  );
});

StatusEditContent.displayName = 'StatusEditContent';

export default StatusEditContent;
