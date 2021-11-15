import { ArrowRightOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import EstimateBadge from '../../../EstimateBadge/estimate-badge';
import { EstimateEditContentProps } from './estimate-edit-content.types';

const EstimateEditContent = React.memo<EstimateEditContentProps>(({ edit }) => {
  return (
    <Space>
      Previously:
      {edit.previousNumber != null ? (
        <EstimateBadge value={edit.previousNumber} />
      ) : (
        'No estimate'
      )}
      <ArrowRightOutlined />
      Now:
      {edit.newNumber != null ? (
        <EstimateBadge value={edit.newNumber} />
      ) : (
        'No estimate'
      )}
    </Space>
  );
});

EstimateEditContent.displayName = 'EstimateEditContent';

export default EstimateEditContent;
