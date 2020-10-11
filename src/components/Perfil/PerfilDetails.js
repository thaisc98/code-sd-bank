import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPerfilById } from "../../state-mgmt/actions/perfil.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const PerfilDetails = ({ match, perfilActual, getPerfilById }) => {
  useEffect(() => {
    const init = async () => {
      await getPerfilById(match.params._id);
    };
    init();

    console.log("perfilA", perfilActual);
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/perfiles">
        <Button className="mb-4">
          <LeftOutlined />
        </Button>
      </Link>
      <h3>Detalles del Perfil</h3>
      {perfilActual && (
        <Descriptions bordered layout="horizontal" column={{ xxl: 4, xl: 1 }}>
          <Descriptions.Item label="Rol: ">{perfilActual.rol}</Descriptions.Item>
          <Descriptions.Item label="Descripcion:">
            {perfilActual.descripcion}
          </Descriptions.Item>
          <Descriptions.Item label="Entidad Asociada:">
            {perfilActual.tipo_entidad_asociada}
          </Descriptions.Item>
          <Descriptions.Item label="Creado en:">
            {getReadibleDate(perfilActual.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Última actualización:">
            {getReadibleDate(perfilActual.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  perfilActual: state.perfiles.perfilActual,
});

export default connect(mapStateToProps, {
  getPerfilById,
})(PerfilDetails);
