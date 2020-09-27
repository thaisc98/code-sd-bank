import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router-dom";

const SideBar = () => {
  const { Sider } = Layout;
  const { SubMenu: SubMenuL } = Menu;

  const [redirectTo, setRedirectTo] = useState();

  const handleClick = (campo) => setRedirectTo(`/${campo}`);

  return (
    <div>
      {redirectTo && <Redirect to={redirectTo} />}
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "auto", borderRight: 0 }}
          >
            <Menu.Item
              icon={<HomeOutlined />}
              key="1"
              onClick={() => handleClick("")}
            >
              Home
            </Menu.Item>
            <SubMenuL key="sub1" icon={<UserOutlined />} title="Entidades">
              <Menu.Item key="2" onClick={() => handleClick("clientes")}>
                Clientes
              </Menu.Item>
              <Menu.Item key="3" onClick={() => handleClick("perfiles")}>
                Perfiles
              </Menu.Item>
            </SubMenuL>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default SideBar;
