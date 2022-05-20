import { List } from "antd";
import { getFollowers } from "app/features";
import { UserCard } from "Components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const Followers = ({ userId }: any) => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const resp = await dispatch(getFollowers(userId));
      setList(resp.payload);
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
      renderItem={(item: any) => <UserCard person={item} />}
    />
  );
};
