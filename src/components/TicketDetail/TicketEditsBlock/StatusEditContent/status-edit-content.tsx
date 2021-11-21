import { ArrowRightOutlined } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import React from 'react';
import { StatusEditContentProps } from './status-edit-content.types';

const StatusEditContent = React.memo<StatusEditContentProps>(({ edit }) => {
  return (
    <Space>
      Previously:
      <Tag color="green">{edit.previousStatus?.name}</Tag>
      <ArrowRightOutlined />
      Now:
      <Tag color="green">{edit.newStatus?.name}</Tag>
    </Space>
  );
});

StatusEditContent.displayName = 'StatusEditContent';

export default StatusEditContent;
