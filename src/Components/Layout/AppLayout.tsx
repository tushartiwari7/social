import { FC } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { MetaInfo } from "./MetaInfo/MetaInfo";
import { Layout } from "antd";
import "./AppLayout.css";
import { Route, Routes } from "react-router-dom";
export const AppLayout: FC = () => {
  return (
    <Layout className="layout">
      <Sidebar />
      <Routes>
        <Route path="/" element={<main>Hello frnds</main>} />
        <Route path="/home" element={<main>Hello frnds homepage</main>} />
        <Route path="*" element={<main>404 error</main>} />
      </Routes>
      <MetaInfo />
    </Layout>
  );
};
