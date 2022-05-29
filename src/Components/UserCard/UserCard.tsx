import { Avatar, List, Switch } from "antd";
import { followUser, unfollowUser } from "app/features";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const UserCard = ({ person, searchResult = false }: any) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);

  const isFollowing = auth?.user?.followings?.some(
    (id: string) => id === person?._id
  );

  const followHandler = async () => {
    setLoading(true);
    if (isFollowing) {
      await dispatch(unfollowUser(person?._id));
    } else {
      await dispatch(followUser(person?._id));
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
