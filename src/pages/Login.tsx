import React from 'react'
import { login } from '../services/authService';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      await login(values);
      navigate('/');
    } catch (error: any) {
      navigate('/login');
      console.error(error);
    }
  };

  return (
    <>
      <div className='bg-slate-100'>
        <div className='container mx-auto h-screen p-4 flex items-center'>
          <div className='w-1/4 mx-auto'>
            <div className='m-6 text-center font-semibold text-2xl'>
              <h3 >Login</h3>
            </div>
            <Form
              name="loginForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              {/* username */}
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              {/* password */}
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className='!bg-blue-500' htmlType="submit" style={{ width: '100%' }}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
