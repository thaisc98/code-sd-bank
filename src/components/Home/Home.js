import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Carousel, Layout } from "antd";

const Home = () => {
  const titleStyles = {
    textAlign: "center",
    fontSize: "1.5rem",
  };

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const { Content } = Layout;
  return (
    <Content className="container mt-4">
      <h3></h3>
      <Carousel autoplay>
        <div>
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "70%",
            }}
            class="center"
            height="100%"
            width="70%"
            src={require("C:/Users/Alien Ware/OneDrive/Documentos/INTEC/Prog 3/core-sd-bank/src/assert/bank2.png")}
          />
        </div>
        <div>
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "70%",
            }}
            class="center"
            height="100%"
            width="100%"
            src={require("C:/Users/Alien Ware/OneDrive/Documentos/INTEC/Prog 3/core-sd-bank/src/assert/bank3.PNG")}
          />
        </div>
      </Carousel>
    </Content>
  );
};

export default Home;
