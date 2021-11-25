import { Breadcrumb } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavigationContext } from '../../../context/navigation.context';
import { TraxBreadcrumbProps } from './trax-breadcrumb.types';

const TraxBreadcrumb = React.memo<TraxBreadcrumbProps>(({ className = '' }) => {
  const navigationContext = useContext(NavigationContext);

  return (
    <Breadcrumb className={className}>
      {navigationContext.navigationItems.map((item) => {
        return (
          <Breadcrumb.Item key={item.href}>
            <Link to={item.href}>{item.label}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});

TraxBreadcrumb.displayName = 'TraxBreadcrumb';

export default TraxBreadcrumb;
