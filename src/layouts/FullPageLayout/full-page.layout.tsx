import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import './full-page.layout.scss';

const { Header, Content, Sider } = Layout;

const FullPageLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Teams</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider collapsible>
          <Menu mode="inline">
            <Menu.Item key="active-sprint-item">Active Sprint</Menu.Item>
            <Menu.Item key="backlog-item">Backlog</Menu.Item>
            <Menu.Item key="assigned-to-me-item">Assigned To Me</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="content-wrapper-layout">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Teams</Breadcrumb.Item>
            <Breadcrumb.Item>CORE</Breadcrumb.Item>
            <Breadcrumb.Item>Sprint 61</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="main-content">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default FullPageLayout;
