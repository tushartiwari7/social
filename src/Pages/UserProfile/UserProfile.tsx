import { Button, Divider, Space, Typography } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { UserTweets } from "./UserTweets/UserTweets";
import { EditUserModal } from "./EditUserModal/EditUserModal";
import { followUser, unfollowUser } from "app/features";
import { EnvironmentOutlined, PaperClipOutlined } from "@ant-design/icons";
import "./UserProfile.css";
const { Title } = Typography;

export const UserProfile: FC = () => {
  const location: any = useLocation();
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const { pathname } = location;
  const [visible, setVisible] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  let user = users.find(
    (user: any) => user.username === pathname.split("/")[2]
  );

  const isAdmin = user?.username === auth.user.username;
  if (isAdmin) user = auth.user;

  const isFollowing = auth?.user?.followings?.some(
    (following: string) => following === user?._id
  );

  const followHandler = async () => {
    setLoading(true);
    if (isFollowing) {
      await dispatch(unfollowUser(user?._id));
    } else {
      await dispatch(followUser(user?._id));
    }
    setLoading(false);
  };

  useEffect(() => {
    const current: any = ref.current;
    current.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section ref={ref} className="user-profile">
      <img
        src={`${window.location.origin}/userBanner.svg`}
        width="100%"
        alt="user"
      />
      <div className="avatar-container">
        <img
          src={user?.photo?.secure_url ?? "https://picsum.photos/200"}
          className="avatar"
          alt="user"
        />
        <Button
          className="btn-follow"
          type="primary"
          loading={loading}
          onClick={isAdmin ? () => setVisible((v) => !v) : followHandler}
        >
          {isAdmin ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow"}
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
        <Space size="large" style={{ marginTop: "10px" }}>
          {user?.location && (
            <Typography.Text>
              <EnvironmentOutlined style={{ marginRight: "2px" }} />
              {user.location}
            </Typography.Text>
          )}
          {user?.website && (
            <Typography.Link href={user.website} target="_blank">
              <PaperClipOutlined style={{ marginRight: "2px" }} />
              {user.website}
            </Typography.Link>
          )}
        </Space>
      </div>
      <Divider orientation="left">
        <Typography.Title level={3}>Tweets</Typography.Title>
      </Divider>
      <UserTweets />
    </section>
  );
};