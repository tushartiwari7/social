import { useState, FC, ReactNode, Key } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  BorderlessTableOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  MoreOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BulbOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

export const Sidebar: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  function getItem(
    label: string,
    key: Key,
    icon?: ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      onClick: () => {
        if (key !== "sub1" && key !== "sub2") {
          navigate(label, { state: { from: location } });
        }
      },
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Explore", "2", <BorderlessTableOutlined />),
    getItem("Connections", "sub1", <TeamOutlined />, [
      getItem("Followers", "4", <UserSwitchOutlined />),
      getItem("Followings", "5", <UserSwitchOutlined />),
    ]),
    getItem("Bookmarks", "6", <BulbOutlined />),
    getItem("Profile", "7", <UserOutlined />),
    getItem("More", "sub2", <MoreOutlined />, [
      getItem("Settings", "8", <SettingOutlined />),
      getItem("Logout", "9", <UserDeleteOutlined />),
    ]),
  ];

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={handleCollapse}
      breakpoint="lg"
      className="navbar"
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};
