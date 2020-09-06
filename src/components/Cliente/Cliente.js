import React from "react";
import moment from "moment";
import { deleteCliente } from "../../state-mgmt/actions/cliente-actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const editI = {
  color: "#48db27",
  marginRight: "8px",
};

const deleteI = {
  color: "#f52d1b",
};

const Cliente = ({ cliente, deleteCliente }) => {
  const createdAt = JSON.stringify(moment(cliente.created_at).format("LLL"));
  const updatedAt = JSON.stringify(moment(cliente.updated_at).format("LLL"));

  return (
    <tr>
      <td>{cliente.nombre}</td>
      <td>{cliente.apellido}</td>
      <td> {cliente.cedula}</td>
      <td> {cliente.sexo}</td>
      <td>{createdAt.slice(1, createdAt.length - 1)}</td>
      <td>{updatedAt.slice(1, updatedAt.length - 1)}</td>

      <td>
        <i style={editI} className="far fa-edit"></i>
        <i
          onClick={() => deleteCliente(cliente._id)}
          style={deleteI}
          className="fas fa-trash-alt"
        ></i>
      </td>
    </tr>
  );
};

Cliente.prototypes = {
  cliente: PropTypes.object.isRequired,
  deleteCliente: PropTypes.func.isRequired,
};

export default connect(null, { deleteCliente })(Cliente);
