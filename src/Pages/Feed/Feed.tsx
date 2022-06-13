import { FC, useEffect, useState } from "react";
import { Avatar, Space, Button, Upload, List, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import "./Feed.css";
import { ListItem } from "Components";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, postTweet } from "app/features";

export const Feed: FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const formData = new FormData();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const tweets = useSelector((state: any) => state.tweets);

  const dispatch = useDispatch();
  const beforeUpload = (file: any) => {
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
    formData.set("description", text);
    formData.set("userPhoto", auth.user.photo.secure_url);
    formData.set("userName", auth.user.name);
    await dispatch(postTweet(formData));
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
          <Avatar size={64} src={auth.user?.photo?.secure_url} />
          <Space className="text-area" direction="vertical">
            <TextArea
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
      renderItem={(item: any) => <ListItem {...item} key={item?._id} />}
    ></List>
  );
};
