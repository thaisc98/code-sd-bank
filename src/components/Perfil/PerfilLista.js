import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchPerfiles } from "../../state-mgmt/actions/perfil-actions";

import Perfil from "./Perfil";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Table } from "antd";
import { getReadibleDate } from "../../utils/date-formatter";

const PerfilLista = ({ fetchPerfiles, perfiles }) => {
  const [createPerfil, setCreatePerfil] = useState(false);

  useEffect(() => {
    fetchPerfiles();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Creado en",
      dataIndex: "created_at",
    },
    {
      title: "Última actualización",
      dataIndex: "updated_at",
    },
    {
      title: "Operación",
      key: "operacion",
      render: () => (
        <span>
          <i style={editIStyles} className="far fa-edit"></i>
          <i
            // onClick={() => deleteCliente(cliente._id)}
            style={deleteIStyles}
            className="fas fa-trash-alt"
          ></i>
        </span>
      ),
    },
  ];

  const dataMapped =
    perfiles &&
    perfiles.map((perfil) => ({
      ...perfil,
      created_at: getReadibleDate(perfil.created_at),
      updated_at: getReadibleDate(perfil.updated_at),
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
    <div>
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
      <Table columns={columns} bordered dataSource={dataMapped} />
    </div>
  );
};

PerfilLista.prototypes = {
  fetchClientes: PropTypes.func.isRequired,
  perfiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  perfiles: state.perfiles,
});

export default connect(mapStateToProps, { fetchPerfiles })(PerfilLista);
