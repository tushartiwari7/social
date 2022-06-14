import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getAllUsers, getBookmarks, login } from "app/features";
import { useState } from "react";
import { useAppDispatch } from "app/store";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await dispatch(login(values));
      await Promise.all([dispatch(getAllUsers()), dispatch(getBookmarks())]);
      navigate("/");
      message.success("Logged in successfully");
    } catch (error) {
      message.error("Oops!, Login Failed.");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="banner.svg" alt="Login" />
        </div>
        <Form
          name="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              LOGIN
            </Button>
          </Form.Item>
          <Typography.Paragraph className="login-test-credentials">
            <Typography.Link
              href="#"
              onClick={() => {
                onFinish({
                  email: process.env.REACT_APP_GUEST_MAIL,
                  password: process.env.REACT_APP_GUEST_PASSWORD,
                });
              }}
            >
              Login with Test Credentials.
            </Typography.Link>
          </Typography.Paragraph>
          <Typography.Text className="login-form-forgot">
            Not a User? <Link to="/signup">Create Account.</Link>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};
