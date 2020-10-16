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
            width="400" height="400"
            src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1602795502/black_logo_qej0gv.png"
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
            src="https://res.cloudinary.com/dmjuegn3l/image/upload/v1602816925/bank3.png"
          />
        </div>
      </Carousel>
    </Content>
  );
};

export default Home;
