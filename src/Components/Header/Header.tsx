import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, Radio, Typography } from "antd";
import { sort } from "app/features";
import { useAppDispatch, useAppSelector } from "app/store";

type MyLocation = {
  from: {
    pathname: string;
  };
};

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const path = location.pathname;
  const urlParams = path.split("/");
  const source = urlParams[urlParams.length - 1] ?? "";
  const [defaultValue, setDefaultValue] = useState<
    "Trending" | "Oldest" | "Latest" | ""
  >("");
  const users = useAppSelector((state) => state.users);
  const user =
    source.length > 15
      ? users.find((user) => user?._id === source)
      : users.find((user) => user?.username === source);

  const getTitle = () => {
    if (urlParams.length > 3 && urlParams.includes("tweet")) return "Tweet";
    else return user?.name ?? (urlParams[urlParams.length - 1] || "Home");
  };

  const locationState = location.state as MyLocation | undefined;

  useEffect(() => {
    return () => setDefaultValue("");
  }, [location.pathname]);

  return (
    <PageHeader
      className="site-page-header"
      onBack={() => navigate(locationState ? locationState.from.pathname : "/")}
      title={getTitle()}
      extra={
        location.pathname === "/" ||
        location.pathname === "/Home" ||
        (location.pathname.split("/")[1] === "u" &&
          location.pathname.split("/").length <= 3) ||
        (location.pathname === "/Explore" && (
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
        ))
      }
    />
  );
};
