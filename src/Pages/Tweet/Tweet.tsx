// React Hooks
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// Feature: Tweet
import { deleteComment, getComments, getSingleTweet } from "app/features";
import { AddCommentBox, ListItem } from "Components";
// Design: Tweet
import { Comment, Avatar, Divider, List } from "antd";
import "./Tweet.css";

type commentList = {
  comments: [];
};

const CommentList = ({ comments }: commentList) => {
  const commentsLoading = useSelector(
    (state: any) => state.tweets.commentsLoading
  );

  const dispatch = useDispatch();
  return (
    <List
      dataSource={comments}
      loading={commentsLoading}
      renderItem={(props: any) => {
        return (
          <Comment
            author={props.userName}
            content={props.body}
            avatar={props.photoUrl || "https://via.placeholder.com/64"}
            key={props._id}
            actions={[
              <span key="reply-to">Reply to &nbsp; &nbsp;|</span>,
              <span
                key="delete"
                onClick={() => dispatch(deleteComment(props._id))}
              >
                Delete
              </span>,
            ]}
          >
            {props.children}
          </Comment>
        );
      }}
    />
  );
};

export const Tweet: FC = () => {
  const location = useLocation();
  const tweetId = location.pathname.split("/").pop();
  const authUser = useSelector((state: any) => state.auth.user);
  const { singleTweet, loading, singleTweetComments } = useSelector(
    (state: any) => state.tweets
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(getSingleTweet(tweetId)),
        dispatch(getComments(tweetId)),
      ]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetId]);

  return (
    <div className="tweet-page">
      <List
        itemLayout="vertical"
        size="large"
        className="tweet-list"
        style={{ overflow: "auto", flexGrow: 1 }}
        dataSource={[singleTweet]}
        loading={loading}
        renderItem={(item) => item._id && <ListItem {...item} />}
      ></List>
      <Divider orientation="left">
        Recent Comments ({singleTweetComments.length})
      </Divider>
      {singleTweetComments.length > 0 && (
        <CommentList comments={singleTweetComments} />
      )}
      <Comment
        avatar={
          <Avatar
            src={authUser?.photo.secure_url}
            alt={authUser?.name}
            size="large"
          />
        }
        content={<AddCommentBox />}
      />
    </div>
  );
};
