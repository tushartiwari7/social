import { Avatar, List, Switch } from "antd";
import { followUser, unfollowUser } from "app/features";
import { useAppDispatch, useAppSelector } from "app/store";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const UserCard = ({ person, searchResult = false }: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const isFollowing = auth?.user?.followings?.some(
    (id: string) => id === person?._id
  );

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
        avatar={<Avatar src={person?.photo?.secure_url} />}
        title={
          <Link to={`/u/${person.username}`} state={{ from: location }}>
            {person.name}
          </Link>
        }
        description={`@${person.username}`}
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
