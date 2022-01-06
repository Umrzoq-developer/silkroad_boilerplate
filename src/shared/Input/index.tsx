import React from "react";
import { Input } from "antd";
import { AInputProps } from "./types";

const AInput = ({ type, placeholder, value, onChange }: AInputProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default React.memo(AInput);
