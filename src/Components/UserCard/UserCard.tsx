import { Avatar, List, Switch } from "antd";
import { followUser, unfollowUser } from "app/features";
import { User } from "app/features/Auth/authSlice.types";
import { useAppDispatch, useAppSelector } from "app/store";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
type UserCardType = {
  person: User;
  searchResult?: boolean;
};
export const UserCard = ({ person, searchResult = false }: UserCardType) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const followings = useAppSelector((state) => state.auth.user?.followings);
  const isFollowing = followings?.some((id) => id === person?._id);

  const followHandler = async () => {
    setLoading(true);
    if (person) {
      isFollowing
        ? await dispatch(unfollowUser(person?._id))
        : await dispatch(followUser(person?._id));
    }
    setLoading(false);
  };

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={person?.photo.secure_url} />}
        title={
          <Link to={`/u/${person?.username}`} state={{ from: location }}>
            {person?.name}
          </Link>
        }
        description={`@${person?.username}`}
      />
      {!searchResult && (
        <Switch
          checkedChildren="Following"
          unCheckedChildren="Follow"
          checked={isFollowing}
          loading={loading}
          onChange={followHandler}
        ></Switch>
      )}
    </List.Item>
  );
};
