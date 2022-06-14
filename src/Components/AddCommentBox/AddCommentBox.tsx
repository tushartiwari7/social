import { Form, Button, Mentions } from "antd";
import { addComment } from "app/features";
import { useAppDispatch, useAppSelector } from "app/store";
import { useState } from "react";

type commentBox = {
  parentId?: string;
  close?: () => void;
};

export const AddCommentBox = ({ parentId = "", close }: commentBox) => {
  const [form] = Form.useForm();
  const [prefix, setPrefix] = useState("@");
  const onSearch = (_: string, value: string) => setPrefix(value);
  const postId = useAppSelector((state) => state.tweets.singleTweet?._id);
  const allUsers = useAppSelector(
    (state) => state.users.map((user: any) => user.username) // TODO: fix any type of this
  );
  const mentions: any = {
    "@": allUsers,
    "#": ["javascript", "reactjs", "typescript"],
  };
  const dispatch = useAppDispatch();
  const commentsLoading = useAppSelector(
    (state) => state.tweets.commentsLoading
  );
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(
        addComment({
          body: values["comment-input"],
          postId,
          parentId: parentId || null,
        })
      );
      form.resetFields();
      close && close();
    } catch (errInfo) {
      console.log("Error:", errInfo);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="comment-input">
        <Mentions
          rows={3}
          placeholder="Add a Comment: Type @ to mention people, # to mention tag"
          prefix={["@", "#"]}
          onSearch={onSearch}
        >
          {(mentions[prefix] || []).map((value: string) => (
            <Mentions.Option key={value} value={value}>
              {value}
            </Mentions.Option>
          ))}
        </Mentions>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={commentsLoading} type="primary">
          Add Comment
        </Button>
        <Button
          style={{ marginLeft: "1rem" }}
          htmlType="reset"
          onClick={onReset}
        >
          Reset Comment
        </Button>
      </Form.Item>
    </Form>
  );
};
