import { List, Divider } from "antd";
import { UserCard } from "Components";
import { useAppSelector } from "app/store";

export const Suggestions = () => {
  const userId = useAppSelector((state) => state.auth.user?._id);
  const allUsers = useAppSelector((state) => state.users);
  const users = allUsers
    .slice(allUsers.length - 7)
    .filter((user) => user?._id !== userId)
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
        renderItem={(item) => <UserCard person={item} />}
      />
    </>
  );
};
