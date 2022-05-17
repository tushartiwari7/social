import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "Redux/authSlice";
import "./Signup.css";
export const Signup: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log("Success:", values);
    const resp = await dispatch(signup(values));
    console.log({ resp });
    if (resp.error?.message === "Rejected") {
      message.error(resp.payload);
    } else {
      message.success("Signup successfully");
      navigate("/");
    }
    setLoading(false);
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
