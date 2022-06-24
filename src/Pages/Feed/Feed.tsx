import { useEffect, useState } from "react";
import { Avatar, Space, Button, Upload, List, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "app/store";
import { getFeed, postTweet } from "app/features";
import { ListItem } from "Components";
import "./Feed.css";
import { RcFile } from "antd/lib/upload";

export const Feed = () => {
  const formData = new FormData();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const tweets = useAppSelector((state) => state.tweets);
  const authUser = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    if (isJpgOrPng) {
      formData.set("image", file);
      message.success(`	Saved ${file.name}`);
    }
    return false;
  };

  const onFinish = async () => {
    setLoading(true);
    if (authUser) {
      formData.set("description", text);
      formData.set("userPhoto", authUser.photo.secure_url);
      formData.set("userName", authUser.name);
      await dispatch(postTweet(formData));
    }
    setLoading(false);
    setText("");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    (async () => {
      await dispatch(getFeed());
    })();
  }, [dispatch]);

  return (
    <List
      header={
        <Space className="tweet-input">
          <Avatar size={64} src={authUser?.photo?.secure_url} />
          <Space className="text-area" direction="vertical">
            <Input.TextArea
              placeholder="What's happening?"
              autoSize={{ minRows: 2, maxRows: 6 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Space className="tweet-actions">
              <Upload
                action="nope"
                listType="picture"
                maxCount={1}
                showUploadList={text.length > 0}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Attach Image</Button>
              </Upload>
              <Button type="primary" loading={loading} onClick={onFinish}>
                Tweet
              </Button>
            </Space>
          </Space>
        </Space>
      }
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={tweets.feedTweets}
      loading={tweets.loading}
      renderItem={(item) => <ListItem {...item} key={item?._id} />}
    ></List>
  );
};
