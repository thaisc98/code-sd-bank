import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [toClientes, setToClientes] = useState(false);
  const [toPerfiles, setToPerfiles] = useState(false);

  const irAClientes = () => setToClientes(true);

  const irAPerfiles = () => setToPerfiles(true);

  return (
    <div>
      <h2>Página principal</h2>
      {toClientes && <Redirect to="/clientes"></Redirect>}
      <button onClick={irAClientes} className="btn btn-primary">
        Clientes
      </button>
      <br />
      <br />
      {toPerfiles && <Redirect to="/perfiles"></Redirect>}
      <button onClick={irAPerfiles} className="btn btn-primary">
        Perfiles
      </button>
    </div>
  );
};

export default Home;
