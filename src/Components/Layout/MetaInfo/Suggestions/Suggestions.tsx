import { List, Divider } from "antd";
import { useSelector } from "react-redux";
import { UserCard } from "Components";

export const Suggestions = () => {
  const userId = useSelector((state: any) => state.auth.user._id);
  const allUsers = useSelector((state: any) => state.users);
  const users = allUsers
    .slice(allUsers.length - 7)
    .filter((user: any) => user._id !== userId)
    .reverse();

  return (
    <>
      <Divider orientation="left">Discover New People 🚀 </Divider>
      <List
        itemLayout="horizontal"
        dataSource={users}
        style={{
          border: "1px solid var(--bg-color)",
          borderRadius: "15px",
          margin: "0 5px",
          padding: "1rem",
        }}
        renderItem={(item: any) => <UserCard person={item} />}
      />
    </>
  );
};
