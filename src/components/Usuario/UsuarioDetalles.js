import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";

import {
  fetchUsuarioById,
  fetchEntidadByUsuarioId,
  cerrarDetalles,
} from "../../state-mgmt/actions/usuario.actions";
import { getReadibleDate } from "../../utils/date-formatter";

const UsuarioDetalles = ({
  match,
  usuario,
  fetchUsuarioById,
  fetchEntidadByUsuarioId,
  entidadAsociada,
  cerrarDetalles,
}) => {
  useEffect(() => {
    const init = async () => {
      const { _id: userId } = match.params;

      await fetchUsuarioById(userId);

      await fetchEntidadByUsuarioId(userId);
    };

    init();

    return () => {
      cerrarDetalles();
    };
  }, []);

  return (
    <div className="container mt-4">
      {usuario && entidadAsociada && (
        <div>
          <Link to="/usuarios">
            <Button className="mb-4" type="primary">
              <i className="fas fa-arrow-left"></i>
            </Button>
          </Link>

          <h2 className="mb-3">Detalles del usuario</h2>
          <div className="entity-details">
            <p>
              <b>Nombre completo: </b>
              {entidadAsociada.nombre} {entidadAsociada.apellido}
            </p>
            <p>
              <b>Cédula: </b>
              {entidadAsociada.cedula}
            </p>
            <p>
              <b>Email: </b>
              {usuario.email}
            </p>
            <p>
              <b>Entidad asociada: </b>
              {usuario.tipo_entidad_asociada}
            </p>
            <p>
              <b>Usuario creado en: </b>
              {getReadibleDate(usuario.createdAt)}
            </p>
            <p>
              <b>{usuario.tipo_entidad_asociada} creado en: </b>
              {getReadibleDate(entidadAsociada.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  usuario: state.usuarios.usuario,
  entidadAsociada: state.usuarios.entidadAsociada,
});

export default connect(mapStateToProps, {
  fetchEntidadByUsuarioId,
  fetchUsuarioById,
  fetchEntidadByUsuarioId,
  cerrarDetalles,
})(UsuarioDetalles);
