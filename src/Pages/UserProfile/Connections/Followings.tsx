import { List } from "antd";
import { getFollowings } from "app/features";
import { User } from "app/features/Auth/authSlice.types";
import { useAppDispatch } from "app/store";
import { UserCard } from "Components";
import { useEffect, useState } from "react";

type props = {
  userId: string | undefined;
};

export const Followings = ({ userId }: props) => {
  const [list, setList] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId) {
      (async (id) => {
        const followerList = await dispatch(getFollowings(id)).unwrap();
        setList(followerList);
      })(userId);
    }
  }, [dispatch, userId]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      loading={!list.length}
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
