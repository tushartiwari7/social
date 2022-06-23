import { useEffect } from "react";
import { List } from "antd";
import { getAllTweets } from "app/features";
import { ListItem } from "Components";
import { useAppDispatch, useAppSelector } from "app/store";

export const Explore = () => {
  const { allTweets, loading } = useAppSelector((state) => state.tweets);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getAllTweets());
    })();
  }, [dispatch]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={allTweets}
      loading={loading}
      renderItem={(item) => <ListItem {...item} key={item?._id} />}
    ></List>
  );
};
