import { Button, Divider, Typography } from "antd";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import "./UserProfile.css";
import { UserTweets } from "./UserTweets/UserTweets";

const { Title } = Typography;
export const UserProfile: FC = () => {
  const location = useLocation();
  return (
    <section className="user-profile">
      <img src="https://picsum.photos/400/100" width="100%" alt="user" />
      <div className="avatar-container">
        <img src="https://picsum.photos/200" className="avatar" alt="user" />
        <Button className="btn-follow" type="primary">
          Follow
        </Button>
      </div>
      <div className="user-info">
        <Title level={4}>Tushar Tiwari</Title>
        <Title level={5}>
          Building Perforrmant applications that are easy to maintain, scale
        </Title>
        <div className="follow-info">
          <Link to="connections?default=followers" state={{ from: location }}>
            56 followers
          </Link>
          <Link to="connections?default=followings" state={{ from: location }}>
            56 following
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
