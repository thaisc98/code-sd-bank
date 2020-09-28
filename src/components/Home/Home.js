import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";

const Home = () => {
  const h2Style = {
    marginTop: "1rem",
    textAlign: "center",
  };

  const pStyle = {
    margin: "1.5rem 0",
    fontSize: "1.2rem",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "1.5rem",
  };

  const { Content } = Layout;
  return (
    <Content className="container mt-4">
      <h2 style={titleStyles}>Página principal</h2>
      <p>
        En esta página se presenta una breve descripción de lo que hace el Core.
        Se presentan imágenes en tarjetas, videos cortos, sliders o cualquier
        otra chulería que quieran agregar.
      </p>
    </Content>
  );
};

export default Home;
