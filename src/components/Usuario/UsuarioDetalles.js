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
import { Descriptions } from "antd";

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
      <Link to="/usuarios">
        <Button className="mb-4" type="primary">
          <i className="fas fa-arrow-left"></i>
        </Button>
      </Link>
      <h2 className="mb-3">Detalles del usuario</h2>
      {usuario && entidadAsociada && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Nombre completo">
            {entidadAsociada.nombre} {entidadAsociada.apellido}
          </Descriptions.Item>
          <Descriptions.Item label="Cédula ">
            {entidadAsociada.cedula}
          </Descriptions.Item>
          <Descriptions.Item label="Cédula ">
            {usuario.tipo_entidad_asociada}
          </Descriptions.Item>
          <Descriptions.Item label="Email ">{usuario.email}</Descriptions.Item>
          <Descriptions.Item label="Entidad asocieda ">
            {usuario.tipo_entidad_asociada}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en">
            {getReadibleDate(usuario.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización">
            {getReadibleDate(entidadAsociada.createdAt)}
          </Descriptions.Item>
        </Descriptions>
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
