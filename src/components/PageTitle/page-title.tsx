import { Typography } from 'antd';
import React from 'react';

const PageTitle = React.memo(({ children }) => {
  return <Typography.Title level={3}>{children}</Typography.Title>;
});

PageTitle.displayName = 'PageTitle';

export default PageTitle;
