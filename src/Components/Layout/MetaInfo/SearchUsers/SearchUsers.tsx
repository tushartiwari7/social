import { useState } from "react";
import { AutoComplete } from "antd";
import { searchUsers } from "app/features";
import { UserCard } from "Components/UserCard/UserCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/store";
import { User } from "app/features/Auth/authSlice.types";
let timer: ReturnType<typeof setTimeout> | null;

export const SearchUsers = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const debounce = (search: string) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      (async () => {
        const searchedUsersList = await dispatch(searchUsers(search)).unwrap();
        setOptions(!search ? [] : searchedUsersList);
      })();
    }, 300);
  };

  const onSelect = (username: string) => navigate(`/u/${username}`);
  const onChange = (data: string) => setValue(data);

  return (
    <AutoComplete
      value={value}
      onSelect={onSelect}
      onSearch={debounce}
      onChange={onChange}
      className="search-users"
      placeholder="Search Users"
      listHeight={500}
    >
      {options.map((option) => (
        <AutoComplete.Option key={option?.username}>
          <UserCard person={option} searchResult={true} />
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
};
