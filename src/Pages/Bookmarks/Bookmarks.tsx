import { List } from "antd";
import { ListItem } from "Components";
import { useSelector } from "react-redux";

export const Bookmarks = () => {
  const bookmarks = useSelector((state: any) => state.bookmarks);
  return (
    <List
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={bookmarks}
      renderItem={(item: any) => <ListItem {...item.post} key={item?._id} />}
    ></List>
  );
};
