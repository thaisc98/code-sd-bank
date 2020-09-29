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

const SucursalLista = ({ fetchSucursales, sucursales }) => {
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
      render: () => (
        <span>
          <i style={editIStyles} className="far fa-edit"></i>
          <i
            // onClick={() => deleteSucursal(sucursal._id)}
            style={deleteIStyles}
            className="fas fa-trash-alt"
          ></i>
        </span>
      ),
    },
  ];
  const dataMapped =
    sucursales &&
    sucursales.map((sucursal) => ({
      ...sucursal,
      cajeros: sucursal.cajeros.length,
      createdAt: getReadibleDate(sucursal.createdAt),
      updatedAt: getReadibleDate(sucursal.updatedAt),
      key: sucursal.cedula,
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
  // deleteSucursal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sucursales: state.sucursales.sucursales,
});

export default connect(mapStateToProps, { fetchSucursales })(SucursalLista);
