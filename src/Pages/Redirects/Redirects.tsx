import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const Redirects: FC = () => {
  const location: any = useLocation();
  const { pathname } = location;
  const auth = useSelector((state: any) => state.auth);

  const getRedirectLink = (pathname: string) => {
    switch (pathname) {
      case "/Profile":
        return "/u/" + auth.user.username;

      case "/Followers":
        return "/u/" + auth.user.username + "/connections?default=followers";

      case "/Followings":
        return "/u/" + auth.user.username + "/connections?default=followings";

      default:
        return "/";
    }
  };
  return (
    <Navigate
      to={getRedirectLink(pathname)}
      replace
      state={location.state?.from}
    />
  );
};
