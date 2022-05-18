import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "app/features";

export const Redirects: FC = () => {
  const location: any = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const getRedirectLink = (pathname: string) => {
    switch (pathname) {
      case "/Profile":
        return "/u/" + auth.user.username;

      case "/Followers":
        return "/u/" + auth.user.username + "/connections?default=followers";

      case "/Followings":
        return "/u/" + auth.user.username + "/connections?default=followings";

      case "/Logout": {
        dispatch(logout());

        break;
      }
      default:
        return "/";
    }
  };

  return (
    <Navigate
      to={getRedirectLink(pathname) ?? "/"}
      replace
      state={location.state?.from}
    />
  );
};
