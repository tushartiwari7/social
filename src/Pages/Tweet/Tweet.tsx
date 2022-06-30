// React Hooks
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Feature: Tweet
import { getComments, getSingleTweet } from "app/features";

// Design: Tweet
import { AddCommentBox, Comment, ListItem } from "Components";
import { Comment as AntdComment, Avatar, Divider, List } from "antd";
import "./Tweet.css";
import { useAppDispatch, useAppSelector } from "app/store";
import { CommentList } from "app/features/Tweet/tweet.types";

const Comments = ({ comments }: CommentList) => {
  const commentsLoading = useAppSelector(
    (state) => state.tweets.commentsLoading
  );
  return (
    <List
      dataSource={comments}
      loading={commentsLoading}
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

export const Tweet = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const tweetId = location.pathname.split("/").pop();
  const authUser = useAppSelector((state) => state.auth.user);
  const { singleTweet, loading, singleTweetComments } = useAppSelector(
    (state) => state.tweets
  );

  useEffect(() => {
    (async () => {
      tweetId &&
        (await Promise.all([
          dispatch(getSingleTweet(tweetId)),
          dispatch(getComments(tweetId)),
        ]));
    })();
  }, [dispatch, tweetId]);

  return (
    <div className="tweet-page">
      {singleTweet && (
        <>
          <List
            itemLayout="vertical"
            size="large"
            className="tweet-list"
            style={{ overflow: "auto", flexGrow: 1 }}
            dataSource={[singleTweet]}
            loading={loading}
            renderItem={(item) => item && <ListItem {...item} />}
          ></List>
          <Divider orientation="left">
            Recent Comments ({singleTweet?.statistics?.commentCount})
          </Divider>
          {singleTweetComments.length > 0 && (
            <Comments comments={singleTweetComments} />
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
        </>
      )}
    </div>
  );
};
