import { Tabs } from "antd";
import { FC } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { Followers } from "./Followers";
import { Followings } from "./Followings";

export const Connections: FC = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("default") || "followers";
  return (
    <div>
      <Tabs
        defaultActiveKey={defaultTab}
        onChange={(key) => console.log(key)}
        centered
      >
        <Tabs.TabPane tab="Followers" key="followers">
          <Followers />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Followings" key="followings">
          <Followings />
        </Tabs.TabPane>
      </Tabs>
      <Outlet />
    </div>
  );
};
