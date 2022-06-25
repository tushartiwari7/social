import { useEffect, useState } from "react";
import { List } from "antd";
import { getFollowers } from "app/features";
import { User } from "app/features/Auth/authSlice.types";
import { useAppDispatch } from "app/store";
import { UserCard } from "Components";

type FollowersType = {
  userId: string | undefined;
};

export const Followers = ({ userId }: FollowersType) => {
  const [list, setList] = useState<User[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      (async (id) => {
        const followerList = await dispatch(getFollowers(id)).unwrap();
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
