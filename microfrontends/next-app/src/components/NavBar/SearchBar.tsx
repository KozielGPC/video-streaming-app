"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export function SearchBar() {
  return (
    <form action="/" method="get" style={{ position: "relative" }}>
      <Input
        type="text"
        id="search"
        name="search"
        placeholder="Pesquisar"
        defaultValue={""}
        prefix={<SearchOutlined style={{ color: "gray" }} />}
        style={{ width: "100%" }}
      />
    </form>
  );
}
