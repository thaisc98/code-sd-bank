import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getReadibleDate } from "../../utils/date-formatter";
import { Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import {fetchPrestamoByClienteId} from '../../state-mgmt/actions/prestamo.actions';
import { fetchClientes } from "../../state-mgmt/actions/cliente.actions";

const PrestamoDetalles = ({ match, prestamoActual, fetchPrestamoByClienteId,fetchClientes,clientes }) => {
   const [clienteId, setClienteId] = useState(); 
  useEffect(() => {
    const init = async () => {
      await fetchPrestamoByClienteId(match.params._id);
    };
    // fetchClientes();
    init();
    
  }, []);
  return (
    <div className="container mt-4">
      <Link to="/prestamos">
        <Button className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>
      <h3>Detalles de préstamo</h3>
      {prestamoActual && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Descripcion">
            {prestamoActual.descripcion}
          </Descriptions.Item>
          <Descriptions.Item label="Cantidad total:">
            {prestamoActual.cantidad_total}
          </Descriptions.Item>
          <Descriptions.Item label="Cantidad saldada:">
            {prestamoActual.cantidad_saldada}
          </Descriptions.Item>
          <Descriptions.Item label="Cantidad restante:">
            {prestamoActual.cantidad_restante}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en">
            {getReadibleDate(prestamoActual.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización">
            {getReadibleDate(prestamoActual.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  prestamoActual: state.prestamos.prestamoActual,
  clientes: state.clientes.clientes,
});

export default connect(mapStateToProps, {
  fetchPrestamoByClienteId,
  fetchClientes
})(PrestamoDetalles);
