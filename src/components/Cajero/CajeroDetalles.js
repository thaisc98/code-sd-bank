import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSucursalById } from "../../state-mgmt/actions/sucursal.actions";
import {
  fetchCajeroById,
  fetchUsuarioCajero,
} from "../../state-mgmt/actions/cajero.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Link } from "react-router-dom";

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
      <h2>Detalles del cajero</h2>
      {cajero && (
        <div>
          <div className="cajero-detalles">
            <p>
              <b>Nombre: </b>
              {cajero.nombre}
            </p>
            <p>
              <b>Apellido: </b>
              {cajero.apellido}
            </p>
            <p>
              <b>Cédula: </b>
              {cajero.cedula}
            </p>
            <p>
              <b>Sucursal a la que pertenece: </b>
              {sucursal.nombre}
            </p>
            <p>
              <b>Creado en: </b>
              {getReadibleDate(cajero.createdAt)}
            </p>
            <p>
              <b>Última actualización: </b>
              {getReadibleDate(cajero.createdAt)}
            </p>
          </div>

          {cajero.usuario && cajeroUsuario ? (
            <div>
              <p>
                <b>Registrado: </b> Sí
              </p>
              <p>
                <b>Correo de usuario:</b> {cajeroUsuario.email}
              </p>
            </div>
          ) : (
            <p>
              Este cajero no tiene ninguna cuenta de usuario.{" "}
              <span>
                <Link to={`/cajeros/${cajero._id}/auth/registrar`}>
                  Crear cuenta de usuario
                </Link>
              </span>
            </p>
          )}
        </div>
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
