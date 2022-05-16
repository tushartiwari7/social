import { Button, Checkbox, Form, Input, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
export const Signup: FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="illustration-wrapper">
          <img src="banner.svg" alt="signup" />
        </div>
        <Form
          name="signup-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Typography.Title> Join Elevate Social</Typography.Title>
          <p>Create an account</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="mail"
            rules={[{ required: true, message: "Please enter a valid mail" }]}
          >
            <Input type="email" placeholder="E-Mail" />
          </Form.Item>
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: "Please enter a valid mail" }]}
          >
            <Input type="text" placeholder="Name" />
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
              className="signup-form-button"
            >
              signup
            </Button>
          </Form.Item>
          <Typography.Text className="signup-form-forgot">
            Already a User? <Link to="/login">Sign In.</Link>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};
