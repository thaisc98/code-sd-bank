import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPerfil } from "../../state-mgmt/actions/perfil-actions";

const INITIAL_CLIENTE = {
  rol: "",
  descripcion: "",
};

const PerfilFormulario = ({ createPerfil }) => {
  const [perfil, setPerfil] = useState(INITIAL_CLIENTE);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(perfil).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [perfil]);

  const handleChange = (event) => {
    const { rol, value } = event.target;

    setError(undefined);
    setPerfil((prevState) => ({ ...prevState, [rol]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setCliente((prev) => ({
        ...prev,
      }));

      await createPerfil(perfil);

      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="mt-3 container">
      <div className="row ">
        {success && <Redirect to="/perfiles"></Redirect>}
        <div className="col-md-8">
          <div className="col-md-8">
            <h4>Crear Perfil</h4>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="rol">Rol</label>
                <input
                  placeholder="Rol"
                  name="rol"
                  value={perfil.rol}
                  className="rol-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input
                  placeholder="Descripcion"
                  name="descripcion"
                  value={perfil.descripcion}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              {error && (
                <div className="error-text">
                  <h3>
                    <i class="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={!valido}
                className="btn btn-success btn-block"
              >
                <i className="fas fa-database"></i> Crear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createPerfil })(PerfilFormulario);
