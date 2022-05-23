import { PageHeader } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const path: string = location.pathname;
  const urlParams: string[] = path.split("/");
  const source = urlParams.pop() ?? "";

  const users = useSelector((state: any) => state.users);
  const user =
    source.length > 15
      ? users.find((user: any) => user._id === source)
      : users.find((user: any) => user.username === source);

  const getTitle = () => {
    if (urlParams.length > 3 && urlParams.includes("tweet")) {
      return "Tweet";
    } else {
      return user?.name ?? "Home";
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
