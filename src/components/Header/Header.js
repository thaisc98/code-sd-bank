import React, { useState } from "react";
import { Layout, Menu } from "antd";

import { Redirect, useHistory } from "react-router-dom";

const { Header: HeaderL } = Layout;

const Header = () => {
  const [redirectTo, setRedirectTo] = useState();

  const handleClick = (campo) => setRedirectTo(`/${campo}`);
  return (
    <div>
      {redirectTo && <Redirect to={redirectTo} />}
      <HeaderL className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="4">Login</Menu.Item>
          <Menu.Item key="5" onClick={() => handleClick("clientes")}>
            Clientes
          </Menu.Item>
          <Menu.Item key="6" onClick={() => handleClick("perfiles")}>
            Perfiles
          </Menu.Item>
        </Menu>
      </HeaderL>
    </div>
  );
};

export default Header;
