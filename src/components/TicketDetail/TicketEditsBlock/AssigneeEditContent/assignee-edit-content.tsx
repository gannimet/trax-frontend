import { ArrowRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import UserDisplayLine from '../../../UserDisplayLine/user-display-line';
import { AssigneeEditContentProps } from './assignee-edit-content.types';

const AssigneeEditContent = React.memo<AssigneeEditContentProps>(({ edit }) => {
  return (
    <Space>
      <div>
        Previously:
        <br />
        {edit.previousAssignee ? (
          <UserDisplayLine user={edit.previousAssignee} />
        ) : (
          'Unassigned'
        )}
      </div>
      <ArrowRightOutlined />
      <div>
        Now:
        <br />
        {edit.newAssignee ? (
          <UserDisplayLine user={edit.newAssignee} />
        ) : (
          'Unassigned'
        )}
      </div>
    </Space>
  );
});

AssigneeEditContent.displayName = 'AssigneeEditContent';

export default AssigneeEditContent;
