import { FC } from "react";
import { Avatar, Space, Button, Upload, List } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import "./Feed.css";
import { ListItem } from "Components";

type tweetType = {
  tweetId: string;
  userName: string;
  avatar: string;
  name: string;
  content: string;
  image?: string;
};

const tweets: tweetType[] = [
  {
    userName: "tushartiwari",
    tweetId: "e3e4ed34233s12xd",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Tushar Tiwari",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
  {
    userName: "manojbajpayee",
    tweetId: "e3e4ed34233s12xd",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Manoj Bajpayee",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
  {
    userName: "jantudeb",
    tweetId: "e3e4ed34233s12xd",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Jantu Deb",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
];
export const Feed: FC = () => {
  return (
    <List
      header={
        <Space className="tweet-input">
          <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
          <Space className="text-area" direction="vertical">
            <TextArea
              placeholder="What's happening?"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <Space className="tweet-actions">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Attach Image</Button>
              </Upload>
              <Button type="primary">Tweet </Button>
            </Space>
          </Space>
        </Space>
      }
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={tweets}
      renderItem={(item) => <ListItem {...item} />}
    ></List>
  );
};
