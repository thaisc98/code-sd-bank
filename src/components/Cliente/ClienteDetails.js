import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchClienteById } from "../../state-mgmt/actions/cliente.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const ClienteDetails = ({ match, clienteActual, fetchClienteById }) => {
  useEffect(() => {
    const init = async () => {
      await fetchClienteById(match.params._id);
    };
    init();
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/clientes">
        <Button className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>
      <h3>Detalles del cliente</h3>
      {clienteActual && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Nombre">
            {clienteActual.nombre}
          </Descriptions.Item>
          <Descriptions.Item label="Apellido">
            {clienteActual.apellido}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en">
            {getReadibleDate(clienteActual.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización">
            {getReadibleDate(clienteActual.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  clienteActual: state.clientes.clienteActual,
});

export default connect(mapStateToProps, {
  fetchClienteById,
})(ClienteDetails);
