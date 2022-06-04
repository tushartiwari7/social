import React, { useState } from "react";
import { AutoComplete } from "antd";
import { useDispatch } from "react-redux";
import { searchUsers } from "app/features";
import { UserCard } from "Components/UserCard/UserCard";
import { useNavigate } from "react-router-dom";
let timer: ReturnType<typeof setTimeout> | null;

export const SearchUsers: React.FC = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debounce = (search: string) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      (async () => {
        const res = await dispatch(searchUsers(search));
        setOptions(!search ? [] : res.payload);
      })();
    }, 300);
  };

  const onSelect = (username: string) => navigate(`/u/${username}`);
  const onChange = (data: string) => setValue(data);

  return (
    <>
      <AutoComplete
        value={value}
        onSelect={onSelect}
        onSearch={debounce}
        onChange={onChange}
        className="search-users"
        placeholder="Search Users"
        listHeight={500}
      >
        {options.map((option: any) => (
          <AutoComplete.Option key={option.username}>
            <UserCard person={option} searchResult={true} />
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    </>
  );
};
