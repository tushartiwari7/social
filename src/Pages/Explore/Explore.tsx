import { List } from "antd";
import { getAllTweets } from "app/features";
import { ListItem } from "Components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Explore = () => {
  const { allTweets, loading } = useSelector((state: any) => state.tweets);
  const dispatch = useDispatch();
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
      renderItem={(item: any) => <ListItem {...item} key={item?._id} />}
    ></List>
  );
};
