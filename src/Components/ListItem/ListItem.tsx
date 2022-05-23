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

export const ListItem = (item: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List.Item
      key={item._id}
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
        item.image?.url && (
          <img
            className="tweet-attached-img"
            width={272}
            alt="logo"
            src={item.image.url}
          />
        )
      }
      onClick={() => {
        console.log(item);
        navigate(`/u/${item.user._id}/tweet/${item._id}`, {
          state: { from: location },
        });
      }}
    >
      <List.Item.Meta
        avatar={<Avatar src={item.user.photo.secure_url} />}
        title={
          <Link to={`/u/${item.user._id}`} onClick={(e) => e.stopPropagation()}>
            {item.user.name}
          </Link>
        }
      />
      {item.description}
    </List.Item>
  );
};
