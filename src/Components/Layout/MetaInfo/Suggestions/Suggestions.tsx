import { FC } from "react";
import { List, Avatar, Divider, Switch } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Jantu Deb",
    userName: "jantudeb",
  },
  {
    name: "Mariya Sada",
    userName: "mariyasada",
  },
  {
    name: "Bhakti Kharatkar",
    userName: "bhaktee",
  },
  {
    name: "Ritik Kapoor",
    userName: "rkap10",
  },
];

export const Suggestions: FC = () => (
  <>
    <Divider orientation="left">Who To Follow? </Divider>
    <List
      itemLayout="horizontal"
      dataSource={data}
      style={{
        border: "1px solid var(--bg-color)",
        borderRadius: "15px",
        margin: "0 5px",
        padding: "1rem",
      }}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<Link to={`/u/${item.userName}`}>{item.name}</Link>}
            description={`@${item.userName}`}
          />
          <Switch
            checkedChildren="Following"
            unCheckedChildren="Follow"
            defaultChecked
          ></Switch>
        </List.Item>
      )}
    />
  </>
);
