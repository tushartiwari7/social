import { FC } from "react";
import { List, Avatar, Divider, Switch } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const Suggestions: FC = () => {
  const auth = useSelector((state: any) => state.auth);
  const users = useSelector((state: any) => state.users).filter(
    (user: any) =>
      user.username !== auth.user.username || // if athe authenticated user and this user are same
      user.followers.some((u: string) => u === auth.user.username) // if this user follows authenticated user already.
  );
  const location = useLocation();
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
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <Link to={`/u/${item.username}`} state={{ from: location }}>
                  {item.name}
                </Link>
              }
              description={`@${item.username}`}
            />
            <Switch
              checkedChildren="Following"
              unCheckedChildren="Follow"
              defaultChecked={false}
            ></Switch>
          </List.Item>
        )}
      />
    </>
  );
};
