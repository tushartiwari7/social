import { List, Avatar, Switch } from "antd";
import { Link } from "react-router-dom";

export const Followings = ({ list }: any) => (
  <List
    itemLayout="horizontal"
    dataSource={list}
    style={{
      border: "1px solid var(--bg-color)",
      borderRadius: "15px",
      margin: "0 5px",
      padding: "1rem",
    }}
    renderItem={(item: any) => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar
              src={
                item?.photo?.secure_url ?? "https://joeschmoe.io/api/v1/random"
              }
            />
          }
          title={<Link to={`/u/${item.username}`}>{item.name}</Link>}
          description={`@${item.username}`}
        />
        <Switch
          checkedChildren="Following"
          unCheckedChildren="Follow"
          defaultChecked
        ></Switch>
      </List.Item>
    )}
  />
);
