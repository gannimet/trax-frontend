import {
  DashboardTwoTone,
  DatabaseTwoTone,
  FileAddFilled,
  FrownTwoTone,
  HomeFilled,
  IdcardTwoTone,
  TagTwoTone,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import TraxBreadcrumb from '../../components/Navigation/TraxBreadcrumb/trax-breadcrumb';
import UserDisplayLine from '../../components/UserDisplayLine/user-display-line';
import Routes from '../../constants/routes';
import CurrentTeamContextProvider from '../../context/CurrentTeamContext/current-team.context';
import NavigationContextProvider from '../../context/NavigationContext/navigation.context';
import { useAuthState } from '../../hooks/use-auth';
import { AuthIdentity } from '../../models/auth.models';
import AuthService from '../../services/auth.service';
import {
  AuthActions,
  AuthReducerAction,
} from '../../state/actions/auth.actions';
import { StoreStateType } from '../../state/root.reducer';
import './full-page.layout.scss';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const FullPageLayout: React.FC = ({ children }) => {
  const authState = useAuthState();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const dispatch: ThunkDispatch<StoreStateType, void, AuthReducerAction> =
    useDispatch<Dispatch<AuthReducerAction>>();

  if (
    !authState.isAuthenticated ||
    !authState.authenticationInfo?.tokenContents
  ) {
    return <Redirect to="/login" />;
  }

  const {
    firstName,
    lastName,
    avatar,
    id: userId,
  } = authState.authenticationInfo?.tokenContents;
  const { logout } = new AuthActions();

  const onLogoutRequested = () => {
    dispatch(logout());
  };

  // Setup automatic logout on 401 and 403 errors
  AuthService.setupLogoutInterceptor(onLogoutRequested);

  return (
    <NavigationContextProvider>
      <CurrentTeamContextProvider>
        <Layout>
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="dashboard" icon={<HomeFilled />}>
                <Link to={Routes.Overview.path}>Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="teams" icon={<TeamOutlined />}>
                Teams
              </Menu.Item>
              <Menu.Item key="createTeam" icon={<UsergroupAddOutlined />}>
                Create Team
              </Menu.Item>
              <Menu.Item key="createTicket" icon={<FileAddFilled />}>
                <Link to={Routes.CreateTicket.path}>New ticket</Link>
              </Menu.Item>
              <SubMenu
                key="sub-nav"
                icon={
                  <UserDisplayLine
                    user={
                      {
                        firstName,
                        lastName,
                        avatar,
                        id: userId,
                      } as AuthIdentity
                    }
                  />
                }
                style={{ marginLeft: 'auto' }}
              >
                <Menu.Item key="profile-item" icon={<IdcardTwoTone />}>
                  Profile
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  key="logout-item"
                  icon={<FrownTwoTone />}
                  onClick={onLogoutRequested}
                >
                  Logout
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Layout>
            <Sider
              collapsible
              className="sidebar"
              onCollapse={setSidebarCollapsed}
            >
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
              <TraxBreadcrumb className="content-layout__breadcrumb" />
              <Content className="content-layout__content">{children}</Content>
              <Footer className="content-layout__footer">
                Trax Issue Tracker ©2021 Created By Colimit
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </CurrentTeamContextProvider>
    </NavigationContextProvider>
  );
};

export default FullPageLayout;
