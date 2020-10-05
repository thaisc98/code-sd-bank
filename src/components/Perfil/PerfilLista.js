import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  deletePerfil,
  fetchPerfiles,
} from "../../state-mgmt/actions/perfil.actions";
import PropTypes from "prop-types";
import { Button, Table } from "antd";
import { getReadibleDate } from "../../utils/date-formatter";
import { connect } from "react-redux";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PerfilLista = ({ fetchPerfiles, perfiles, deletePerfil }) => {
  const [createPerfil, setCreatePerfil] = useState(false);

  useEffect(() => {
    fetchPerfiles();
  }, []);

  const columns = [
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Entidad asociada",
      dataIndex: "tipo_entidad_asociada",
      key: "descripcion",
    },
    {
      title: "Creado en",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Última actualización",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, perfil) => (
        <span>
          <Link to={`/perfil/${perfil._id}/detalles`}>
            <EyeOutlined
              style={{
                fontSize: "1.3rem",
                marginRight: "20px",
              }}
            />
          </Link>
          <Link to={`perfil/${perfil._id}/editar`}>
            <EditOutlined style={editIStyles} />
          </Link>
          <DeleteOutlined
            onClick={(event) => onDeletePerfil(perfil.key, event)}
            style={deleteIStyles}
          />
        </span>
      ),
    },
  ];

  const onDeletePerfil = async (_id, event) => {
    event.preventDefault();

    alertify.confirm(
      "Confirmar eliminación",
      "¿Seguro que desea eliminar este perfil?",
      async () => {
        try {
          await deletePerfil(_id);

          notyf.success("Perfil eliminado satisfactoriamente.");
        } catch (error) {
          notyf.error(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const dataMapped =
    perfiles &&
    perfiles.map((perfil) => ({
      ...perfil,
      created_at: getReadibleDate(perfil.createdAt),
      updated_at: getReadibleDate(perfil.updatedAt),
      key: perfil._id,
    }));

  const editIStyles = {
    color: "#48db27",
    fontSize: "1.2rem",
    marginRight: "20px",
  };

  const deleteIStyles = {
    color: "#f52d1b",
    fontSize: "1.2rem",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "1.5rem",
  };

  const createBtnStyles = {
    marginBottom: ".8rem",
  };

  return (
    <div className="container mt-4">
      {createPerfil && <Redirect to="/perfiles/crear"></Redirect>}

      <h2 style={titleStyles}>Perfiles</h2>

      <Button
        type="primary"
        style={createBtnStyles}
        onClick={() => setCreatePerfil(true)}
      >
        Nuevo Perfil <i className="fas fa-plus-square ml-2"></i>
      </Button>

      {createPerfil && <Redirect to="/perfiles/crear"></Redirect>}
      <Table
        className="ant-table"
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        dataSource={dataMapped}
      />
    </div>
  );
};

PerfilLista.propTypes = {
  fetchPerfiles: PropTypes.func.isRequired,
  perfiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  perfiles: state.perfiles.perfiles,
});

export default connect(mapStateToProps, { fetchPerfiles, deletePerfil })(
  PerfilLista
);
