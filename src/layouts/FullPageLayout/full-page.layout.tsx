import {
  DashboardTwoTone,
  DatabaseTwoTone,
  FrownTwoTone,
  IdcardTwoTone,
  TagTwoTone,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './full-page.layout.scss';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const FullPageLayout: React.FC = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Teams</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <SubMenu
            key="sub-nav"
            title="Side Navigation"
            style={{ marginLeft: 'auto' }}
          >
            <Menu.Item key="profile-item" icon={<IdcardTwoTone />}>
              Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout-item" icon={<FrownTwoTone />}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Layout>
        <Sider collapsible className="sidebar" onCollapse={setSidebarCollapsed}>
          <Menu mode="inline">
            <Menu.Item key="active-sprint-item" icon={<DashboardTwoTone />}>
              Active Sprint
            </Menu.Item>
            <Menu.Item key="backlog-item" icon={<DatabaseTwoTone />}>
              Backlog
            </Menu.Item>
            <Menu.Item key="assigned-to-me-item" icon={<TagTwoTone />}>
              Assigned To Me
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="content-layout"
          style={{ marginLeft: isSidebarCollapsed ? '80px' : '200px' }}
        >
          <Breadcrumb className="content-layout__breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Teams</Breadcrumb.Item>
            <Breadcrumb.Item>CORE</Breadcrumb.Item>
            <Breadcrumb.Item>Sprint 61</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content-layout__content">{children}</Content>
          <Footer className="content-layout__footer">
            Trax Issue Tracker ©2021 Created By Colimit
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FullPageLayout;
