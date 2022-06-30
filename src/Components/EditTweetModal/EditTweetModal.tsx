import { Avatar, Button, message, Modal, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { editTweet } from "app/features";
import { useAppDispatch, useAppSelector } from "app/store";
import { RcFile } from "antd/lib/upload";

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
  const authUser = useAppSelector((state) => state.auth.user);
  const editing = useAppSelector((state) => state.tweets.editing);
  const [tweet, setTweet] = useState<string>(description);
  const dispatch = useAppDispatch();
  const formData = new FormData();

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

  return (
    <Modal
      title="Edit Tweet"
      visible={visible}
      onOk={async () => {
        formData.append("description", tweet);
        await dispatch(editTweet({ tweetId, formData }));
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
