import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getReadibleDate } from "../../utils/date-formatter";
import { Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { fetchSucursalById } from "../../state-mgmt/actions/sucursal.actions";

const SucursalDetalles = ({ match, sucursalActual, fetchSucursalById }) => {
  useEffect(() => {
    const init = async () => {
      await fetchSucursalById(match.params._id);
    };
    init();
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/sucursales">
        <Button type="primary" className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>
      <h3>Detalles de la sucursal</h3>
      {sucursalActual && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Nombre">
            {sucursalActual.nombre}
          </Descriptions.Item>
          <Descriptions.Item label="Ciudad">
            {sucursalActual.ciudad}
          </Descriptions.Item>
          <Descriptions.Item label="Calle">
            {sucursalActual.calle}
          </Descriptions.Item>
          <Descriptions.Item label="Número">
            {sucursalActual.numero}
          </Descriptions.Item>
          <Descriptions.Item label="Codigo postal">
            {sucursalActual.codigo_postal}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en">
            {getReadibleDate(sucursalActual.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización">
            {getReadibleDate(sucursalActual.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sucursalActual: state.sucursales.sucursalActual,
});

export default connect(mapStateToProps, {
  fetchSucursalById,
})(SucursalDetalles);
