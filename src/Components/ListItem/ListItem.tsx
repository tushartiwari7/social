import { Link, useLocation, useNavigate } from "react-router-dom";
import { FC, SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/store";

import { Image, Avatar, List, message, Space } from "antd";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
  StarFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import {
  bookmarkTweet,
  deleteTweet,
  dislikeTweet,
  likeTweet,
  removeBookmark,
} from "app/features";
import { EditTweetModal } from "Components";
import "./ListItem.css";
import { Tweet } from "app/features/Tweet/tweet.types";

type iconType = {
  Icon: FC;
  text: number;
  onClick?: (e: SyntheticEvent) => void;
};

const IconText = ({ Icon, text, onClick }: iconType) => (
  <Space style={{ cursor: "pointer" }} onClick={onClick}>
    <Icon />
    {text}
  </Space>
);

export const ListItem = (tweet: Tweet) => {
  const [editTweetModalVisible, setEditTweetModalVisible] = useState(false);
  const closeModal = () => setEditTweetModalVisible(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const bookmarks = useAppSelector((state) => state.bookmarks);

  const isAuthUserPost = authUser?._id === tweet.user?._id;
  const isLiked: boolean = authUser
    ? tweet.likes.includes(authUser._id)
    : false;
  const isBookmarked = bookmarks.some((item) => item.post._id === tweet._id);

  const createdAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(tweet.createdAt));

  const tweetActions = [
    <IconText
      Icon={isLiked ? LikeFilled : LikeOutlined}
      text={tweet.statistics.likeCount}
      key="list-vertical-like-o"
      onClick={async (e) => {
        e.stopPropagation();

        if (isLiked) await dispatch(dislikeTweet(tweet._id));
        else await dispatch(likeTweet(tweet._id));

        if (isLiked) message.success("Like Removed");
        else message.success("Liked Tweet");
      }}
    />,
    <>
      {isBookmarked ? (
        <StarFilled
          onClick={async (e) => {
            e.stopPropagation();
            await dispatch(removeBookmark(tweet._id));
            message.success("Tweet Removed from Bookmarks");
          }}
        />
      ) : (
        <StarOutlined
          onClick={async (e) => {
            e.stopPropagation();
            await dispatch(bookmarkTweet(tweet._id));
            message.success("Tweet Added to Bookmarks");
          }}
        />
      )}
    </>,
    <IconText
      Icon={MessageOutlined}
      text={tweet.statistics.commentCount}
      key="list-vertical-message"
    />,
  ];
  return (
    <>
      <List.Item
        key={tweet._id}
        actions={
          isAuthUserPost
            ? [
                ...tweetActions,
                <EditOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditTweetModalVisible(true);
                  }}
                />,
                <DeleteOutlined
                  onClick={async (e) => {
                    e.stopPropagation();
                    await dispatch(deleteTweet(tweet._id));
                    message.success("Deleted Tweet");
                  }}
                />,
              ]
            : tweetActions
        }
        extra={
          tweet.image?.url && (
            <Image
              onClick={(e) => e.stopPropagation()}
              className="tweet-attached-img"
              width={272}
              alt="logo"
              src={tweet.image.url}
            />
          )
        }
        onClick={() => {
          tweet.user &&
            navigate(`/u/${tweet.user._id}/tweet/${tweet._id}`, {
              state: { from: location },
            });
        }}
      >
        <List.Item.Meta
          avatar={<Avatar src={tweet.user?.photo?.secure_url} />}
          title={
            <Link
              to={`/u/${tweet.user?._id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {tweet.user?.name}
            </Link>
          }
          description={createdAt}
        />
        {tweet.description}
      </List.Item>
      {isAuthUserPost && (
        <EditTweetModal
          visible={editTweetModalVisible}
          closeModal={closeModal}
          description={tweet.description}
          tweetId={tweet._id}
        />
      )}
    </>
  );
};
