import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";

const { Header: HeaderL } = Layout;

const Header = () => {
  return (
    <HeaderL  className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="3">"Login"</Menu.Item>
      </Menu>
    </HeaderL>
  );
};

export default Header;
