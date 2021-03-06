import { Sidebar } from "./Sidebar/Sidebar";
import { MetaInfo } from "./MetaInfo/MetaInfo";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Header } from "Components/Header/Header";
import {
  Bookmarks,
  Connections,
  Explore,
  Feed,
  Redirects,
  Tweet,
  UserProfile,
} from "Pages";
import "./AppLayout.css";

export const AppLayout = () => {
  return (
    <Layout className="layout">
      <Sidebar />
      <main>
        <Header />
        <Routes>
          <Route path="" element={<Feed />} />
          <Route path="/home" element={<Feed />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Redirects />} />
          <Route path="/followers" element={<Redirects />} />
          <Route path="/followings" element={<Redirects />} />
          <Route path="/logout" element={<Redirects />} />
          <Route path="/u/:userName">
            <Route index element={<UserProfile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="tweet/:tweetId" element={<Tweet />} />
          </Route>
          <Route path="*" element={<h1>404page</h1>} />
        </Routes>
      </main>
      <MetaInfo />
    </Layout>
  );
};
