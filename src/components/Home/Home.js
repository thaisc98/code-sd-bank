import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [toClientes, setToClientes] = useState(false);

  const irAClientes = () => setToClientes(true);

  return (
    <div>
      <h2>Página principal</h2>
      {toClientes && <Redirect to="/clientes"></Redirect>}

      <button onClick={irAClientes} className="btn btn-primary">
        Clientes
      </button>
    </div>
  );
};

export default Home;
