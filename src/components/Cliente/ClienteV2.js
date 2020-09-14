import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cliente from "./Cliente";
import { fetchClientes } from "../../state-mgmt/actions/cliente-actions";

const ClienteV2 = ({ fetchClientes, clientes }) => {
  //const [create, setCreate] = useState(false);

  React.useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>

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

ClienteV2.prototypes = {
  fetchClientes: PropTypes.func.isRequired,
  clientes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  clientes: state.clientes,
});

export default connect(mapStateToProps, { fetchClientes })(ClienteV2);
