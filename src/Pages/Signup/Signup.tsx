import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, getBookmarks, signup } from "app/features";
import "./Signup.css";
import { signupData } from "app/features/Auth/authSlice.types";
import { useAppDispatch } from "app/store";
export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: signupData) => {
    setLoading(true);
    try {
      // dispatch returns a PayloadAction and .unwrap returns the payload of that action (fullfilled or rejected)
      const resp = await dispatch(signup(values)).unwrap();
      if (resp?._id) {
        await Promise.all([dispatch(getAllUsers()), dispatch(getBookmarks())]);
        message.success("Signup successfully");
        navigate("/");
      }
    } catch (error) {
      message.error("Oops!, Signup Failed.");
    }
    setLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Failed to send the signup request.");
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
            <Input type="text" placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter a valid mail" }]}
          >
            <Input type="email" placeholder="E-Mail" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your Full Name" }]}
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
              loading={loading}
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
