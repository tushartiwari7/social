import { FC } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { MetaInfo } from "./MetaInfo/MetaInfo";
import { Layout } from "antd";
import "./AppLayout.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "Components/Header/Header";
import { Feed } from "Pages";
export const AppLayout: FC = () => {
  return (
    <Layout className="layout">
      <Sidebar />
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/home" element={<Feed />} />
          <Route path="*" element={<main>404 error</main>} />
        </Routes>
      </main>
      <MetaInfo />
    </Layout>
  );
};
