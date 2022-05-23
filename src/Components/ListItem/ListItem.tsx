import { Avatar, List, Space } from "antd";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import "./ListItem.css";
import { useDispatch, useSelector } from "react-redux";
import { dislikeTweet, likeTweet } from "app/features";
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

export const ListItem = (tweet: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authUser = useSelector((state: any) => state.auth.user);
  const isLiked = tweet.likes.includes(authUser._id);
  return (
    <List.Item
      key={tweet._id}
      actions={[
        <IconText
          Icon={isLiked ? LikeFilled : LikeOutlined}
          text={tweet.statistics.likeCount}
          key="list-vertical-like-o"
          onClick={async (e) => {
            e.stopPropagation();
            debugger;
            if (isLiked) await dispatch(dislikeTweet(tweet._id));
            else await dispatch(likeTweet(tweet._id));
          }}
        />,
        <IconText
          Icon={StarOutlined}
          text={tweet.statistics.favoriteCount}
          key="list-vertical-star-o"
          onClick={(e) => {
            e.stopPropagation();
            console.log("bookmark");
          }}
        />,
        <IconText
          Icon={MessageOutlined}
          text={tweet.statistics.commentCount}
          key="list-vertical-message"
          onClick={() => {
            console.log("comment");
          }}
        />,
      ]}
      extra={
        tweet.image?.url && (
          <img
            className="tweet-attached-img"
            width={272}
            alt="logo"
            src={tweet.image.url}
          />
        )
      }
      onClick={() => {
        console.log(tweet);
        navigate(`/u/${tweet.user._id}/tweet/${tweet._id}`, {
          state: { from: location },
        });
      }}
    >
      <List.Item.Meta
        avatar={<Avatar src={tweet.user.photo.secure_url} />}
        title={
          <Link
            to={`/u/${tweet.user._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {tweet.user.name}
          </Link>
        }
      />
      {tweet.description}
    </List.Item>
  );
};
