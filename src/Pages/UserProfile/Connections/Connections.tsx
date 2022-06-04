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
  const user = pathname.split("/")[2];
  const users = useSelector((state: any) => state.users);
  const userDb = users.find((singleUser: any) => singleUser.username === user);

  return (
    <div className="connections">
      <Tabs defaultActiveKey={defaultTab} centered>
        <Tabs.TabPane tab="Followers" key="followers">
          <Followers userId={user.length > 15 ? user : userDb?._id} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Followings" key="followings">
          <Followings userId={user.length > 15 ? user : userDb?._id} />
        </Tabs.TabPane>
      </Tabs>
      <Outlet />
    </div>
  );
};
