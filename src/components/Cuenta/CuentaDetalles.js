import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCuentaById } from "../../state-mgmt/actions/cuenta.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const CuentaDetalles = ({ match, cuentaActual, fetchCuentaById }) => {
  useEffect(() => {
    const init = async () => {
      await fetchCuentaById(match.params._id);
    };
    init();
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/cuentas">
        <Button type="primary" className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>
      <h3>Detalles del cuentas</h3>
      {cuentaActual && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Número de cuenta">
            {cuentaActual.numero_de_cuenta}
          </Descriptions.Item>
          <Descriptions.Item label="Balance disponible">
            {cuentaActual.balance_disponible}
          </Descriptions.Item>
          <Descriptions.Item label="Cantidad total de tránsito">
            {cuentaActual.cantidad_total_en_transito}
          </Descriptions.Item>
          <Descriptions.Item label="Número de cuenta">
            {cuentaActual.numero_de_cuenta}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en">
            {getReadibleDate(cuentaActual.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización">
            {getReadibleDate(cuentaActual.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cuentaActual: state.cuentas.cuentaActual,
});

export default connect(mapStateToProps, {
  fetchCuentaById,
})(CuentaDetalles);
