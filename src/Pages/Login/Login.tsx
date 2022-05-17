import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "Redux/authSlice";
import "./Login.css";

export const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);
    const resp = await dispatch(login(values));
    console.log({ resp });
    if (resp.error?.message === "Rejected") {
      message.error(resp.payload);
    } else {
      navigate("/");
      message.success("Logged in successfully");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed", errorInfo);
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
            email: process.env.REACT_APP_GUEST_MAIL,
            password: process.env.REACT_APP_GUEST_PASSWORD,
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
            <Input type="email" placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
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
          <Typography.Text className="login-form-forgot">
            Not a User? <Link to="/signup">Create Account.</Link>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};
