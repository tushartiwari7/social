import { PageHeader } from "antd";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const path: string = location.pathname;
  const title: string = path.split("/").pop() ?? "";

  const from: string = location.state?.from?.pathname ?? "";

  return (
    <PageHeader
      className="site-page-header"
      onBack={() => navigate(from)}
      title={title}
    />
  );
};
