import { Layout } from "antd";
import { FC } from "react";
import "./MetaInfo.css";
import { SearchUsers } from "./SearchUsers/SearchUsers";
import { Suggestions } from "./Suggestions/Suggestions";

const { Sider } = Layout;

export const MetaInfo: FC = () => {
  return (
    <Sider breakpoint="sm" className="meta-info">
      <SearchUsers />
      <Suggestions />
    </Sider>
  );
};
