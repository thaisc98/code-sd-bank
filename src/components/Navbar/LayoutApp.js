import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ClienteV2 from "../Cliente/ClienteV2";
import PerfilV2 from "../Perfil/PerfilV2";

const LayoutApp = () => {
  const { SubMenu } = Menu;
  const { Header, Content, Sider, Footer } = Layout;
  const [content, setContent] = useState();
  let history = useHistory();

  const handleClick = (compo) => {
    let path = "/clientes";
    if (compo === "clientes") {
      setContent(ClienteV2);
      path = "/clientes";
    } else if (compo === "perfiles") {
      setContent(PerfilV2);
      path = "/perfiles";
    }

    history.push(path);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="3">"Login"</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1" onClick={() => handleClick("clientes")}>
                Cliente
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleClick("perfiles")}>
                Perfil
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 600,
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutApp;
