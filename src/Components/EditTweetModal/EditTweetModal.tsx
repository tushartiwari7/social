import { Avatar, Button, Modal, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

type editTweetModal = {
  closeModal: () => void;
  visible: boolean;
  tweetContent: string;
};

export const EditTweetModal = ({
  closeModal,
  visible,
  tweetContent,
}: editTweetModal) => {
  const authUser = useSelector((state: any) => state.auth.user);
  const [tweet, setTweet] = useState(tweetContent);
  return (
    <Modal
      title="Edit Tweet"
      visible={visible}
      onOk={() => {}}
      onCancel={closeModal}
      okText="Update Tweet"
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
              action="nope"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Attach Image</Button>
            </Upload>
          </Space>
        </Space>
      </Space>
    </Modal>
  );
};
