import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Table, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteCliente,
  fetchClientes,
} from "../../state-mgmt/actions/cliente-actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";

const ClienteLista = ({ fetchClientes, clientes }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchClientes();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
    },
    {
      title: "Cédula",
      dataIndex: "cedula",
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
    },
    {
      title: "Fecha de Registro",
      dataIndex: "created_at",
    },
    {
      title: "Última actualización",
      dataIndex: "updated_at",
    },
    {
      title: "Operación",
      key: "operacion",
      render: () => (
        <span>
          <i style={editIStyles} className="far fa-edit"></i>
          <i
            // onClick={() => deleteCliente(cliente._id)}
            style={deleteIStyles}
            className="fas fa-trash-alt"
          ></i>
        </span>
      ),
    },
  ];
  const dataMapped =
    clientes &&
    clientes.map((cliente) => ({
      ...cliente,
      created_at: getReadibleDate(cliente.created_at),
      updated_at: getReadibleDate(cliente.updated_at),
      key: cliente.cedula,
    }));

  const editIStyles = {
    color: "#48db27",
    fontSize: "1.2rem",
    marginRight: "20px",
  };

  const deleteIStyles = {
    color: "#f52d1b",
    fontSize: "1.2rem",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "1.5rem",
  };

  const createBtnStyles = {
    marginBottom: ".8rem",
  };

  const { Content } = Layout;

  return (
    <Content>
      <h2 style={titleStyles}>Clientes</h2>
      <Button
        type="primary"
        style={createBtnStyles}
        onClick={() => setCreate(true)}
      >
        Nuevo Cliente <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/clientes/crear"></Redirect>}
      <Table columns={columns} bordered dataSource={dataMapped} />
    </Content>
  );
};

ClienteLista.prototypes = {
  fetchClientes: PropTypes.func.isRequired,
  clientes: PropTypes.array.isRequired,
  deleteCliente: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clientes: state.clientes,
});

export default connect(mapStateToProps, { fetchClientes })(ClienteLista);
