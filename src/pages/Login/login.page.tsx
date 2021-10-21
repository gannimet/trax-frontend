import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AuthReducerAction, login } from '../../state/actions/auth.actions';
import { StoreStateType } from '../../state/root.reducer';
import { LoginFormValues } from './login.page.types';

const LoginPage: React.FC = () => {
  const dispatch: ThunkDispatch<StoreStateType, void, AuthReducerAction> =
    useDispatch<Dispatch<AuthReducerAction>>();

  const onSubmit = (values: LoginFormValues) => {
    if (values.email && values.password) {
      dispatch(login(values.email, values.password)).then((result) => {
        console.log('result:', result);
      });
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>

      <Form
        name="login"
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
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
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 6, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
