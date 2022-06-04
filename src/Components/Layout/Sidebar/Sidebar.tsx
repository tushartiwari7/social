import { useState, FC, ReactNode, Key } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  BorderlessTableOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
  BulbOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "app/features";
import { useDispatch } from "react-redux";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

export const Sidebar: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
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
        if (label === "Logout") {
          dispatch(logout());
          return navigate("/login");
        }
        if (key !== "sub1") {
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
    getItem("Logout", "8", <UserDeleteOutlined />),
  ];

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={handleCollapse}
      breakpoint="lg"
      className={`navbar ${collapsed ? "mobile-view" : ""}`}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode={collapsed ? "horizontal" : "inline"}
        items={items}
      />
    </Sider>
  );
};
