import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";

const LayoutApp = () => {
  const [content, setContent] = useState();

  const { Content } = Layout;

  return (
    <Layout>
      <Layout>
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
    </Layout>
  );
};

export default LayoutApp;
