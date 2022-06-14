import { Button, Divider, Empty, Space, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserTweets } from "./UserTweets/UserTweets";
import { EditUserModal } from "./EditUserModal/EditUserModal";
import { followUser, getUserTweets, unfollowUser } from "app/features";
import { EnvironmentOutlined, PaperClipOutlined } from "@ant-design/icons";
import "./UserProfile.css";
import { useAppDispatch, useAppSelector } from "app/store";
const { Title } = Typography;

export const UserProfile = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const { pathname } = location;
  const [visible, setVisible] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  let user = users.find((user) =>
    pathname.split("/")[2].length < 15
      ? user?.username === pathname.split("/")[2]
      : user?._id === pathname.split("/")[2]
  );

  const isAdmin = user?.username === auth.user?.username;
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

    // getUserTweets
    if (user) {
      (async () => {
        await dispatch(getUserTweets(user._id));
      })();
    }
  }, [pathname, dispatch, user]);

  return (
    <section ref={ref} className="user-profile">
      {user ? (
        <>
          <img
            src={`${window.location.origin}/userBanner.svg`}
            width="100%"
            alt="user"
          />
          <div className="avatar-container">
            <img src={user.photo?.secure_url} className="avatar" alt="user" />
            <Button
              className="btn-follow"
              type="primary"
              loading={loading}
              onClick={isAdmin ? () => setVisible((v) => !v) : followHandler}
            >
              {isAdmin ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <EditUserModal
              visible={visible}
              setVisible={setVisible}
              user={user}
            />
          </div>
          <div className="user-info">
            <Title level={4}>{user.name}</Title>
            <Title level={5}>{user.bio || "No bio available"}</Title>
            <div className="follow-info">
              <Link
                to="connections?default=followers"
                state={{ from: location }}
              >
                {user?.followersCount} followers
              </Link>
              <Link
                to="connections?default=followings"
                state={{ from: location }}
              >
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
        </>
      ) : (
        <Empty
          image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          description={<span>User Not Availaible</span>}
        ></Empty>
      )}
    </section>
  );
};
