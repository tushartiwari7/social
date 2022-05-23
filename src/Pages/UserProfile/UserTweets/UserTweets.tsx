import { FC } from "react";
import { List } from "antd";
import { ListItem } from "Components";
import { useSelector } from "react-redux";

export const UserTweets: FC = () => {
  const tweets = useSelector((state: any) => state.tweets);
  return (
    <List
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={tweets.userTweets}
      loading={tweets.loading}
      renderItem={(item: any) => <ListItem {...item} />}
    ></List>
  );
};
