import React, { useState } from "react";
import { AutoComplete } from "antd";

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});

export const SearchUsers: React.FC = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data: string) => {
    // write logic for navigating to user profile
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        className="search-users"
        placeholder="Search Users"
      />
    </>
  );
};
