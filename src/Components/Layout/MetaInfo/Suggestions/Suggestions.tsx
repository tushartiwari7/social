import { List, Divider } from "antd";
import { useSelector } from "react-redux";
import { UserCard } from "Components";

export const Suggestions = () => {
  const auth = useSelector((state: any) => state.auth);
  const allUsers = useSelector((state: any) => state.users);
  const users = allUsers
    ?.filter(
      //if user is not following
      (user: any) => !(auth?.user?._id === user?._id)
    )
    .slice(0, 7);
  return (
    <>
      <Divider orientation="left">Who To Follow? </Divider>
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
