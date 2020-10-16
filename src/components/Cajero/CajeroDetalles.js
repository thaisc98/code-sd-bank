import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSucursalById } from "../../state-mgmt/actions/sucursal.actions";
import {
  fetchCajeroById,
  fetchUsuarioCajero,
} from "../../state-mgmt/actions/cajero.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Alert, Button, Descriptions, message } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const CajeroDetalles = ({
  match,
  cajero,
  fetchSucursalById,
  sucursal,
  cajeroUsuario,
  fetchCajeroById,
  fetchUsuarioCajero,
}) => {
  const [searchable, setSearchable] = useState(false);

  useEffect(() => {
    const init = async () => {
      await fetchCajeroById(match.params._id);
    };

    init();

    setTimeout(() => setSearchable(true), 300);
  }, []);

  useEffect(() => {
    fetchSucursalById(cajero.sucursal);
    fetchUsuarioCajero(cajero._id);
  }, [searchable]);

  return (
    <div className="container mt-4">
      <Link to="/cajeros">
        <Button type="primary" className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>

      <h2>Detalles del cajero</h2>
      {cajero && (
        <>
          <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
            <Descriptions.Item label="Nombre">
              {cajero.nombre}
            </Descriptions.Item>
            <Descriptions.Item label="Apellido">
              {cajero.apellido}
            </Descriptions.Item>
            <Descriptions.Item label="Cédula">
              {cajero.cedula}
            </Descriptions.Item>
            <Descriptions.Item label="Creado en">
              {getReadibleDate(cajero.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Última actualización">
              {getReadibleDate(cajero.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
          {cajero.usuario && cajeroUsuario ? (
            <Alert
              message="Info"
              description={`El cajero tiene cuenta de usuario, su correo del usuario es: ${cajeroUsuario.email} `}
              type="info"
              showIcon
            />
          ) : (
            <p>
              <Link to={`/cajeros/${cajero._id}/auth/registrar`}>
                <Alert
                  message="Info"
                  description="Este cajero no tiene ninguna cuenta de usuario, click para crear cuenta de usuario"
                  type="info"
                  showIcon
                />
              </Link>
            </p>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sucursal: state.sucursales.sucursal,
  cajero: state.cajeros.cajero,
  cajeroUsuario: state.cajeros.cajeroUsuario,
});

export default connect(mapStateToProps, {
  // fetchCajeroByCedula,
  fetchSucursalById,
  fetchUsuarioCajero,
  fetchCajeroById,
})(CajeroDetalles);
