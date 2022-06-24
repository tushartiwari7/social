import { Upload, message, Modal, Input, Typography } from "antd";
import {
  PlusOutlined,
  IeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useAppDispatch } from "app/store";
import { updateUser } from "app/features";
import { User } from "app/features/Auth/authSlice.types";
import { RcFile } from "antd/lib/upload";

type propTypes = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  user: User;
};

export const EditUserModal = ({ visible, setVisible, user }: propTypes) => {
  const [loading, setLoading] = useState(false);
  const formData = new FormData();
  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState({
    name: user?.name,
    bio: user?.bio,
    location: user?.location,
    website: user?.website,
  });

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    if (isJpgOrPng && isLt2M) {
      formData.append("photo", file);
      message.success(`	Saved ${file.name}`);
    }
    return false;
  };

  const onFinish = async () => {
    setLoading(true);
    const userInputArr = Object.entries(userInput);
    userInputArr.forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    await dispatch(updateUser(formData));
    setLoading(false);
    setVisible(false);
  };

  return (
    <Modal
      title="Edit Profile"
      visible={visible}
      onOk={onFinish}
      confirmLoading={loading}
      onCancel={() => setVisible(false)}
      okText="Save Changes"
    >
      <img
        src={`${window.location.origin}/userBanner.svg`}
        width="100%"
        alt="user"
      />
      <div className="avatar-container">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-upload"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </div>
      <Typography.Text>Full Name</Typography.Text>
      <Input
        placeholder="Full Name"
        style={{ marginBottom: "1rem" }}
        defaultValue={user?.name}
        onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
      />
      <Typography.Text>Bio</Typography.Text>
      <TextArea
        placeholder="Bio"
        rows={3}
        style={{ marginBottom: "1rem" }}
        defaultValue={user?.bio}
        onChange={(e) => setUserInput({ ...userInput, bio: e.target.value })}
      />
      <Typography.Text>Location</Typography.Text>
      <Input
        placeholder="Location"
        prefix={<EnvironmentOutlined />}
        style={{ marginBottom: "1rem" }}
        defaultValue={user?.location}
        onChange={(e) =>
          setUserInput({ ...userInput, location: e.target.value })
        }
      />
      <Typography.Text>Website</Typography.Text>
      <Input
        placeholder="Website"
        prefix={<IeOutlined />}
        style={{ marginBottom: "1rem" }}
        defaultValue={user?.website || "https://"}
        onChange={(e) =>
          setUserInput({ ...userInput, website: e.target.value })
        }
      />
    </Modal>
  );
};
