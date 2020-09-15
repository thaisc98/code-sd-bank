import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const h2Style = {
    marginTop: "1rem",
    textAlign: "center",
  };

  const pStyle = {
    margin: "1.5rem 0",
    fontSize: "1.2rem",
  };

  return (
    <div>
      <h2 style={h2Style}>Página principal</h2>

      <p style={pStyle}>
        En esta página se presenta una breve descripción de lo que hace el Core.
        Se presentan imágenes en tarjetas, videos cortos, sliders o cualquier
        otra chulería que quieran agregar.
      </p>
    </div>
  );
};

export default Home;
