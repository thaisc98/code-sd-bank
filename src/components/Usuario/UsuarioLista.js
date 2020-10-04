import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { Table, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchUsuarios,
  deleteUsuario,
} from "../../state-mgmt/actions/usuario.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";
import notyf from "../../utils/notyf";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

const UsuarioLista = ({ fetchUsuarios, usuarios, deleteUsuario }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const columns = [
    {
      title: "Correo electrónico",
      dataIndex: "email",
    },
    {
      title: "Tipo de entidad asociada",
      dataIndex: "tipo_entidad_asociada",
    },
    {
      title: "Fecha de creación",
      dataIndex: "createdAt",
    },
    {
      title: "Última actualización",
      dataIndex: "updatedAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, usuario) => (
        <span>
          <Link to={`/usuarios/${usuario._id}/detalles`}>
            <i className="fas fa-eye details-i-styles"></i>
          </Link>
          <i className="edit-i-styles far fa-edit"></i>
          <i
            onClick={(event) => onDeleteUsuario(usuario, event)}
            className="delete-i-styles fas fa-trash-alt"
          ></i>
        </span>
      ),
    },
  ];

  const onDeleteUsuario = (usuario, event) => {
    event.preventDefault();

    const { _id, tipo_entidad_asociada } = usuario;

    alertify.confirm(
      "Confirmar eliminación",
      "¿Seguro que desea eliminar a este usuario?",
      async () => {
        try {
          await deleteUsuario(_id, tipo_entidad_asociada);

          notyf.success("Usuario eliminado satisfactoriamente.");
        } catch (error) {
          notyf.error(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const dataMapped =
    usuarios &&
    usuarios.map((usuario) => ({
      ...usuario,
      createdAt: getReadibleDate(usuario.createdAt),
      updatedAt: getReadibleDate(usuario.updatedAt),
      key: usuario._id,
    }));

  const { Content } = Layout;

  return (
    <Content className="container mt-4">
      <h2 className="title-styles">Usuarios</h2>
      <Button
        type="primary"
        className="create-btn-styles"
        onClick={() => setCreate(true)}
      >
        Nueva Usuario <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/usuarios/crear"></Redirect>}
      <Table
        className="ant-table"
        columns={columns}
        bordered
        dataSource={dataMapped}
      />
    </Content>
  );
};

UsuarioLista.propTypes = {
  fetchUsuarios: PropTypes.func.isRequired,
  usuarios: PropTypes.array.isRequired,
  deleteUsuario: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usuarios: state.usuarios.usuarios,
});

export default connect(mapStateToProps, { deleteUsuario, fetchUsuarios })(
  UsuarioLista
);
