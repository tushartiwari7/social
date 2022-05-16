import { PageHeader } from "antd";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const path: string = location.pathname;
  const urlParams = path.split("/");
  const getTitle = () => {
    if (urlParams.length > 3 && urlParams.includes("tweet")) {
      return "Tweet";
    } else {
      return urlParams.pop() || "Home";
    }
  };
  const from: string = location.state?.from?.pathname ?? "";

  return (
    <PageHeader
      className="site-page-header"
      onBack={() => navigate(from)}
      title={getTitle()}
    />
  );
};
