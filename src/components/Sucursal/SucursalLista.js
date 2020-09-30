import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Table, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  deleteSucursal,
  fetchSucursales,
} from "../../state-mgmt/actions/sucursal.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";

const SucursalLista = ({ fetchSucursales, sucursales, deleteSucursal }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchSucursales();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
    },
    {
      title: "Cajeros",
      dataIndex: "cajeros",
    },
    {
      title: "Fecha de creación",
      dataIndex: "createdAt",
    },
    {
      title: "Última actualización",
      dataIndex: "updatedAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, sucursal) => (
        <span>
          <i style={editIStyles} className="far fa-edit"></i>
          <i
            onClick={(event) => onDeleteSucursal(sucursal.key, event)}
            style={deleteIStyles}
            className="fas fa-trash-alt"
          ></i>
        </span>
      ),
    },
  ];

  const onDeleteSucursal = (_id, event) => {
    event.preventDefault();

    alertify.confirm(
      "Confirmar eliminación",
      "¿Seguro que desea eliminar esta sucursal?",
      async () => {
        try {
          await deleteSucursal(_id);

          notyf.success("Sucursal eliminada satisfactoriamente.");
        } catch (error) {
          notyf.error(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const dataMapped =
    sucursales &&
    sucursales.map((sucursal) => ({
      ...sucursal,
      cajeros: sucursal.cajeros.length,
      createdAt: getReadibleDate(sucursal.createdAt),
      updatedAt: getReadibleDate(sucursal.updatedAt),
      key: sucursal._id,
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
    <Content className="container mt-4">
      <h2 style={titleStyles}>Sucursales</h2>
      <Button
        type="primary"
        style={createBtnStyles}
        onClick={() => setCreate(true)}
      >
        Nueva Sucursal <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/sucursales/crear"></Redirect>}
      <Table
        className="ant-table"
        columns={columns}
        bordered
        dataSource={dataMapped}
      />
    </Content>
  );
};

SucursalLista.prototypes = {
  fetchSucursales: PropTypes.func.isRequired,
  sucursales: PropTypes.array.isRequired,
  deleteSucursal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sucursales: state.sucursales.sucursales,
});

export default connect(mapStateToProps, { deleteSucursal, fetchSucursales })(
  SucursalLista
);
