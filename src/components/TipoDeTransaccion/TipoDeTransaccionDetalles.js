import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getReadibleDate } from "../../utils/date-formatter";
import { Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { fetchTipoDeTransaccionById } from "../../state-mgmt/actions/tipo-de-transaccion.actions";

const TipoDeTransaccionDetalles = ({
  match,
  tipoDeTransaccionActual,
  fetchTipoDeTransaccionById,
}) => {
  useEffect(() => {
    const init = async () => {
      await fetchTipoDeTransaccionById(match.params._id);
    };
    init();
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/tipos-de-transacciones">
        <Button type="primary" className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>
      <h3>Detalles de la transacción</h3>
      {tipoDeTransaccionActual && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Nombre">
            {tipoDeTransaccionActual.tipo}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en">
            {getReadibleDate(tipoDeTransaccionActual.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización">
            {getReadibleDate(tipoDeTransaccionActual.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tipoDeTransaccionActual: state.tiposDeTransacciones.tipoDeTransaccionActual,
});

export default connect(mapStateToProps, {
  fetchTipoDeTransaccionById,
})(TipoDeTransaccionDetalles);
