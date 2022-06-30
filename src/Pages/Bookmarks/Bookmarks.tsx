import { List } from "antd";
import { Tweet } from "app/features/Tweet/tweet.types";
import { useAppSelector } from "app/store";
import { ListItem } from "Components";

export const Bookmarks = () => {
  const bookmarks = useAppSelector((state) => state.bookmarks);
  return (
    <List
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={bookmarks}
      renderItem={(item) => (
        <ListItem {...(item.post as Tweet)} key={item?._id} />
      )}
    ></List>
  );
};
