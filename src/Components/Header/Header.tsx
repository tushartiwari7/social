import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, Radio, Typography } from "antd";
import { sort } from "app/features";

export const Header: FC = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const path: string = location.pathname;
  const urlParams: string[] = path.split("/");
  const source = urlParams[urlParams.length - 1] ?? "";
  const dispatch = useDispatch();
  const [defaultValue, setDefaultValue] = useState("");
  const users = useSelector((state: any) => state.users);
  const user =
    source.length > 15
      ? users.find((user: any) => user._id === source)
      : users.find((user: any) => user.username === source);

  const getTitle = () => {
    if (urlParams.length > 3 && urlParams.includes("tweet")) return "Tweet";
    else return user?.name ?? (urlParams[urlParams.length - 1] || "Home");
  };

  useEffect(() => {
    return () => setDefaultValue("");
  }, [location.pathname]);

  const from: string = location.state?.from?.pathname ?? "";
  return (
    <PageHeader
      className="site-page-header"
      onBack={() => navigate(from)}
      title={getTitle()}
      extra={
        location.pathname === "/" ||
        location.pathname === "/Home" ||
        (location.pathname.split("/")[1] === "u" &&
          location.pathname.split("/").length <= 3) ||
        location.pathname === "/Explore" ? (
          <>
            <Typography.Text> Sort By:</Typography.Text>
            <Radio.Group
              value={defaultValue}
              onChange={(e) => {
                setDefaultValue(e.target.value);
                dispatch(sort(e.target.value));
              }}
            >
              <Radio.Button value="Trending">Trending</Radio.Button>
              <Radio.Button value="Latest">Latest</Radio.Button>
              <Radio.Button value="Oldest">Oldest</Radio.Button>
            </Radio.Group>
          </>
        ) : null
      }
    />
  );
};
