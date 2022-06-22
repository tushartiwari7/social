import { useEffect, useState } from "react";
import { List } from "antd";
import { getFollowers } from "app/features";
import { User } from "app/features/Auth/authSlice.types";
import { useAppDispatch } from "app/store";
import { UserCard } from "Components";

export const Followers = ({ userId }: any) => {
  const [list, setList] = useState<User[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const followerList = await dispatch(getFollowers(userId)).unwrap();
      setList(followerList);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      style={{
        border: "1px solid var(--bg-color)",
        borderRadius: "15px",
        margin: "0 5px",
        padding: "1rem",
      }}
      renderItem={(item) => <UserCard person={item} />}
    />
  );
};
