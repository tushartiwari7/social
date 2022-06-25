import { List } from "antd";
import { ListItem } from "Components";
import { useAppSelector } from "app/store";

export const UserTweets = () => {
  const tweets = useAppSelector((state) => state.tweets);
  return (
    <List
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={tweets.userTweets}
      loading={tweets.loading}
      renderItem={(item) => <ListItem {...item} />}
    ></List>
  );
};
