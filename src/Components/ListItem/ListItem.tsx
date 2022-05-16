import { Avatar, List, Space } from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import "./ListItem.css";
type iconType = {
  Icon: FC;
  text: number;
  onClick: (e: any) => void;
};

const IconText = ({ Icon, text, onClick }: iconType) => (
  <Space style={{ cursor: "pointer" }} onClick={onClick}>
    <Icon />
    {text}
  </Space>
);

type tweetType = {
  tweetId: string;
  userName: string;
  avatar: string;
  name: string;
  content: string;
  image?: string;
};

export const ListItem = (item: tweetType) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
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
        item.image && (
          <img
            className="tweet-attached-img"
            width={272}
            alt="logo"
            src={item.image}
          />
        )
      }
      onClick={() => {
        navigate(`/u/${item.userName}/tweet/${item.tweetId}`, {
          state: { from: location },
        });
      }}
    >
      <List.Item.Meta
        avatar={<Avatar src={item.avatar} />}
        title={
          <Link to={`/u/${item.userName}`} onClick={(e) => e.stopPropagation()}>
            {item.name}
          </Link>
        }
      />
      {item.content}
    </List.Item>
  );
};
