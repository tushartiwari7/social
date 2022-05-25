import { Avatar, Button, message, Modal, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTweet } from "app/features";

type editTweetModal = {
  closeModal: () => void;
  visible: boolean;
  tweetId: string;
  description: string;
};

export const EditTweetModal = ({
  closeModal,
  visible,
  tweetId,
  description,
}: editTweetModal) => {
  const authUser = useSelector((state: any) => state.auth.user);
  const editing = useSelector((state: any) => state.tweets.editing);
  const [tweet, setTweet] = useState(description);
  const dispatch = useDispatch();
  const formData = new FormData();

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

  return (
    <Modal
      title="Edit Tweet"
      visible={visible}
      onOk={() => {
        formData.append("description", tweet);
        (async () => {
          await dispatch(editTweet({ tweetId: tweetId, formData: formData }));
        })();
        closeModal();
      }}
      onCancel={closeModal}
      okText="Update Tweet"
      confirmLoading={editing}
    >
      <Space className="tweet-input">
        <Avatar size={64} src={authUser?.photo?.secure_url} />
        <Space className="text-area" direction="vertical">
          <TextArea
            placeholder="What's happening?"
            autoSize={{ minRows: 2, maxRows: 6 }}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          <Space className="tweet-actions">
            <Upload
              action="none"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Attach Image</Button>
            </Upload>
          </Space>
        </Space>
      </Space>
    </Modal>
  );
};
