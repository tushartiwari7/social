import { Tabs } from "antd";
import { useAppSelector } from "app/store";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Followers } from "./Followers";
import { Followings } from "./Followings";

export const Connections = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const defaultTab = searchParams.get("default") || "followers";
  const user = pathname.split("/")[2];
  const users = useAppSelector((state) => state.users);
  const userDb = users.find((anyUser) => anyUser?.username === user);

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
