import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Cliente from "./Cliente";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchClientes } from "../../state-mgmt/actions/cliente-actions";

const ClienteLista = ({ fetchClientes, clientes }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  /*
  const clientesMapeados = clientes.map((v) => (
    <td key={cliente._id}></td>
  ));
  */
  return (
    <div>
      {create && <Redirect to="/clientes/crear"></Redirect>}

      <h1>Clientes</h1>

      <button onClick={() => setCreate(true)} className="btn btn-success">
        Create
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Cédula</th>
            <th scope="col">Sexo</th>
            <th scope="col">Creado en</th>
            <th scope="col">Última actualización</th>
            <th scope="col">Op</th>
          </tr>
        </thead>
        <tbody>
          {clientes &&
            clientes.map((cliente) => (
              <Cliente key={cliente._id} cliente={cliente} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

ClienteLista.prototypes = {
  fetchClientes: PropTypes.func.isRequired,
  clientes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  clientes: state.clientes,
});

export default connect(mapStateToProps, { fetchClientes })(ClienteLista);
