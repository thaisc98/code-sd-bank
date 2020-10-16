import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Table, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteCliente,
  fetchClientes,
} from "../../state-mgmt/actions/cliente.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ClienteLista = ({ fetchClientes, clientes, deleteCliente }) => {
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
      dataIndex: "createdAt",
    },
    {
      title: "Última actualización",
      dataIndex: "updatedAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, cliente) => (
        <span>
          <Link to={`/clientes/${cliente._id}/detalles`}>
            <EyeOutlined
              style={{
                fontSize: "1.3rem",
                marginRight: "20px",
              }}
            />
          </Link>
          <Link to={`clientes/${cliente._id}/editar`}>
            <EditOutlined style={editIStyles} />
          </Link>
          <DeleteOutlined
            onClick={(event) => onDeleteCliente(cliente.key, event)}
            style={deleteIStyles}
          />
        </span>
      ),
    },
  ];

  const onDeleteCliente = (_id, event) => {
    event.preventDefault();

    alertify.confirm(
      "Confirmar eliminación",
      "¿Seguro que desea eliminar a este cliente?",
      async () => {
        try {
          await deleteCliente(_id);

          notyf.success("Cliente eliminado satisfactoriamente.");
        } catch (error) {
          notyf.error(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const dataMapped =
    clientes &&
    clientes.map((cliente) => ({
      ...cliente,
      createdAt: getReadibleDate(cliente.createdAt),
      updatedAt: getReadibleDate(cliente.updatedAt),
      key: cliente._id,
    }));

  const editIStyles = {
    color: "#48db27",
    fontSize: "1.3rem",
    marginRight: "20px",
  };

  const deleteIStyles = {
    color: "#f52d1b",
    fontSize: "1.3rem",
  };

  const { Content } = Layout;

  return (
    <Content className="container mt-4">
      <h2 className="title-styles">Clientes</h2>
      <Button
        type="primary"
        className="create-btn-styles"
        onClick={() => setCreate(true)}
      >
        Nuevo Cliente <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/clientes/crear"></Redirect>}
      <div>
        <Table
          responsive
          scroll={{ y: 370 }}
          className="ant-table"
          columns={columns}
          bordered
          dataSource={dataMapped}
        />
      </div>
    </Content>
  );
};

ClienteLista.prototypes = {
  fetchClientes: PropTypes.func.isRequired,
  clientes: PropTypes.array.isRequired,
  deleteCliente: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clientes: state.clientes.clientes,
});

export default connect(mapStateToProps, { fetchClientes, deleteCliente })(
  ClienteLista
);
