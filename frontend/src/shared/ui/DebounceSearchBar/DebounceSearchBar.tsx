"use client";

import { SearchBar } from "antd-mobile";
import { useDebounce } from "../../hooks";
import { FC } from "react";
import { typography } from "@shared/consts";

type DebounceSearchBarProps = {
  placeholder?: string;
  onChange: (value: string) => void;
};

const DebounceSearchBar: FC<DebounceSearchBarProps> = ({
  placeholder,
  onChange,
}) => {
  const [_, setValue] = useDebounce<string>("", 300, (v) => {
    onChange(v);
  });

  const handleChange = (val: string) => {
    setValue(val);
  };

  return (
    <SearchBar
      placeholder={placeholder ?? typography.form.placeholder.input}
      onChange={handleChange}
    />
  );
};

export default DebounceSearchBar;
