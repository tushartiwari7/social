import { useAppSelector } from "app/store";
import { MyLocation } from "helpers.types";
import { Navigate, useLocation } from "react-router-dom";

export const Redirects = () => {
  const location = useLocation();
  const { pathname } = location;
  const user = useAppSelector((state) => state.auth.user);
  const locationState = location.state as MyLocation;

  const getRedirectLink = (pathname: string) => {
    if (!user) return "";

    switch (pathname) {
      case "/Profile":
        return "/u/" + user.username;

      case "/Followers":
        return "/u/" + user.username + "/connections?default=followers";

      case "/Followings":
        return "/u/" + user.username + "/connections?default=followings";

      default:
        return "/";
    }
  };

  return (
    <Navigate
      to={getRedirectLink(pathname)}
      replace
      state={locationState?.from.pathname}
    />
  );
};
