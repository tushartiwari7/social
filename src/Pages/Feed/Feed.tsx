import { FC } from "react";
import { Avatar, Space, Button, Upload, List, Divider } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  UploadOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "./Feed.css";
import { Link } from "react-router-dom";

type tweetType = {
  userName: string;
  avatar: string;
  name: string;
  content: string;
  image?: string;
};

const tweets: tweetType[] = [
  {
    userName: "tushartiwari7",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Tushar Tiwari",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
  {
    userName: "manojbajpayee",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Manoj Bajpayee",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
  {
    userName: "jantudeb",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Jantu Deb",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
];

type Props = {
  Icon: FC;
  text: number;
  onClick: (e: any) => void;
};

const IconText = ({ Icon, text, onClick }: Props) => (
  <Space style={{ cursor: "pointer" }} onClick={onClick}>
    <Icon />
    {text}
  </Space>
);

export const Feed: FC = () => {
  return (
    <>
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
        renderItem={(item) => (
          <>
            <List.Item
              key={item.name}
              actions={[
                <IconText
                  Icon={StarOutlined}
                  text={156}
                  key="list-vertical-star-o"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("bookmark");
                  }}
                />,
                <IconText
                  Icon={LikeOutlined}
                  text={56}
                  key="list-vertical-like-o"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("like");
                  }}
                />,
                <IconText
                  Icon={MessageOutlined}
                  text={21}
                  key="list-vertical-message"
                  onClick={() => {
                    console.log("comment");
                  }}
                />,
              ]}
              extra={
                item.image && <img width={272} alt="logo" src={item.image} />
              }
              onClick={() => console.log("click")}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Link to={`/u/${item.userName}`}>{item.name}</Link>}
              />
              {item.content}
            </List.Item>
          </>
        )}
      ></List>
    </>
  );
};
