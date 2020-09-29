import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Table, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteCajero,
  fetchCajeros,
} from "../../state-mgmt/actions/cajero.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";

const CajeroLista = ({ fetchCajeros, cajeros }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchCajeros();
  }, []);

  const columns = [
    {
      title: "Cédula",
      dataIndex: "cedula",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
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
            // onClick={() => deleteCajero(cajero._id)}
            style={deleteIStyles}
            className="fas fa-trash-alt"
          ></i>
        </span>
      ),
    },
  ];
  const dataMapped =
    cajeros &&
    cajeros.map((cajero) => ({
      ...cajero,
      createdAt: getReadibleDate(cajero.createdAt),
      updatedAt: getReadibleDate(cajero.updatedAt),
      key: cajero.cedula,
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
      <h2 style={titleStyles}>Cajeros</h2>
      <Button
        type="primary"
        style={createBtnStyles}
        onClick={() => setCreate(true)}
      >
        Nuevo Cajero <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/cajeros/crear"></Redirect>}
      <Table
        className="ant-table"
        columns={columns}
        bordered
        dataSource={dataMapped}
      />
    </Content>
  );
};

CajeroLista.prototypes = {
  fetchCajeros: PropTypes.func.isRequired,
  cajeros: PropTypes.array.isRequired,
  // deleteCajero: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cajeros: state.cajeros.cajeros,
});

export default connect(mapStateToProps, { fetchCajeros })(CajeroLista);
