import { Button, Divider, Typography } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./UserProfile.css";
import { UserTweets } from "./UserTweets/UserTweets";
import { EditUserModal } from "./EditUserModal/EditUserModal";

const { Title } = Typography;

export const UserProfile: FC = () => {
  const location: any = useLocation();
  const ref = useRef(null);
  const { pathname } = location;
  const [visible, setVisible] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const users = useSelector((state: any) => state.users);
  let user = users.find(
    (user: any) => user.username === pathname.split("/")[2]
  );
  const isAdmin = user?.username === auth.user.username;
  if(isAdmin)
    user = auth.user;
    
  useEffect(() => {
    const current: any = ref.current;
    current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section ref={ref} className="user-profile">
      <img src="https://picsum.photos/400/100" width="100%" alt="user" />
      <div className="avatar-container">
        <img
          src={user?.photo?.secure_url ?? "https://picsum.photos/200"}
          className="avatar"
          alt="user"
        />
        <Button
          className="btn-follow"
          type="primary"
          onClick={isAdmin ? () => setVisible((v) => !v) : () => {}}
        >
          {isAdmin ? "Edit Profile" : "Follow"}
        </Button>
        <EditUserModal visible={visible} setVisible={setVisible} user={user} />
      </div>
      <div className="user-info">
        <Title level={4}>{user?.name}</Title>
        <Title level={5}>{user?.bio ?? "No bio available"}</Title>
        <div className="follow-info">
          <Link to="connections?default=followers" state={{ from: location }}>
            {user?.followersCount} followers
          </Link>
          <Link to="connections?default=followings" state={{ from: location }}>
            {user?.followingCount} following
          </Link>
        </div>
      </div>
      <Divider orientation="left">
        <Typography.Title level={3}>Tweets</Typography.Title>
      </Divider>
      <UserTweets />
    </section>
  );
};
