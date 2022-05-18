import { Tabs } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Followers } from "./Followers";
import { Followings } from "./Followings";

export const Connections: FC = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const defaultTab = searchParams.get("default") || "followers";
  const username = pathname.split("/")[2];
  const users = useSelector((state: any) => state.users);
  const user = users.find((user: any) => user.username === username);

  return (
    <div>
      <Tabs defaultActiveKey={defaultTab} centered>
        <Tabs.TabPane tab="Followers" key="followers">
          <Followers list={user.followers} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Followings" key="followings">
          <Followings list={user.followings} />
        </Tabs.TabPane>
      </Tabs>
      <Outlet />
    </div>
  );
};
