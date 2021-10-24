import { Button, Col, Divider, Form, Input, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useAuthState } from '../../hooks/use-auth';
import {
  AuthActions,
  AuthReducerAction,
} from '../../state/actions/auth.actions';
import { StoreStateType } from '../../state/root.reducer';
import { LoginFormValues } from './login.page.types';

const LoginPage: React.FC = () => {
  const dispatch: ThunkDispatch<StoreStateType, void, AuthReducerAction> =
    useDispatch<Dispatch<AuthReducerAction>>();
  const authState = useAuthState();
  const { login } = new AuthActions();

  const onSubmit = (values: LoginFormValues) => {
    if (values.email && values.password) {
      dispatch(login(values.email, values.password));
    }
  };

  return authState.isAuthenticated ? (
    <Redirect to="/overview" />
  ) : (
    <div className="login-page">
      <Divider>Login</Divider>

      <Row justify="start">
        <Col span={8} offset={8}>
          <Form
            name="login"
            onFinish={onSubmit}
            labelCol={{ flex: '100px' }}
            wrapperCol={{ flex: 'auto' }}
          >
            <Form.Item
              label="E-Mail"
              name="email"
              rules={[
                { required: true, message: 'Please enter your e-mail address' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Divider />
    </div>
  );
};

export default LoginPage;
