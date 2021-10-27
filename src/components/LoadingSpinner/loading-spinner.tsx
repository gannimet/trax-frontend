import { Col, Row, Spin } from 'antd';
import React from 'react';

const LoadingSpinner = React.memo(() => {
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spin size="large" />
      </Col>
    </Row>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
