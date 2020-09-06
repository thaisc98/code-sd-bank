import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchPerfiles } from "../../state-mgmt/actions/perfil-actions";

import Perfil from "./Perfil";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PerfilLista = ({ fetchPerfiles, perfiles }) => {
  const [createPerfil, setCreatePerfil] = useState(false);

  useEffect(() => {
    fetchPerfiles();
  }, []);

  return (
    <div>
      {createPerfil && <Redirect to="/perfiles/crear"></Redirect>}

      <h1>Perfil</h1>

      <button onClick={() => setCreatePerfil(true)} className="btn btn-success">
        Crear
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {perfiles &&
            perfiles.map((perfil) => (
              <Perfil key={perfil._id} perfil={perfil} />
            ))}
        </tbody>
      </table>
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
