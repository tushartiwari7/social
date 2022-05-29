// React Hooks
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// Feature: Tweet
import { getComments, getSingleTweet } from "app/features";
// Design: Tweet
import { AddCommentBox, Comment, ListItem } from "Components";
import { Comment as AntdComment, Avatar, Divider, List } from "antd";
import "./Tweet.css";

type commentList = {
  comments: [];
};

const CommentList = ({ comments }: commentList) => {
  const commentsLoading = useSelector(
    (state: any) => state.tweets.commentsLoading
  );
  return (
    <List
      dataSource={comments}
      loading={commentsLoading}
      renderItem={(props: any) => <Comment {...props} />}
    />
  );
};

export const Tweet: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const tweetId = location.pathname.split("/").pop();
  const authUser = useSelector((state: any) => state.auth.user);
  const { singleTweet, loading, singleTweetComments, commentReplies } =
    useSelector((state: any) => state.tweets);
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
        Recent Comments ({singleTweetComments.length + commentReplies.length})
      </Divider>
      {singleTweetComments.length > 0 && (
        <CommentList comments={singleTweetComments} />
      )}
      <AntdComment
        avatar={
          <Avatar
            src={authUser?.photo?.secure_url}
            alt={authUser?.name}
            size="large"
          />
        }
        content={<AddCommentBox />}
      />
    </div>
  );
};
