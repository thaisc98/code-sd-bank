import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createCliente } from "../../state-mgmt/actions/cliente-actions";
import { useEffect } from "react";
import { Toast } from "../../utils/toast";

const INITIAL_CLIENTE = {
  cedula: "",
  nombre: "",
  apellido: "",
  sexo: "",
};

const ClienteFormulario = ({ createCliente }) => {
  const [cliente, setCliente] = useState(INITIAL_CLIENTE);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(cliente).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [cliente]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCliente((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setCliente((prev) => ({
        ...prev,
      }));

      await createCliente(cliente);

      setSuccess(true);
    } catch (error) {
      setError(error);
      Toast.fire({
        icon: "error",
        title: error.response.data.error,
      });

      console.log(error);
    }
  };

  return (
    <div className="mt-3 container">
      <div className="row ">
        {success && <Redirect to="/clientes"></Redirect>}
        <div className="col-md-8">
          <div className="col-md-8">
            <h4>Crear cliente</h4>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  placeholder="Nombre"
                  name="nombre"
                  value={cliente.nombre}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  placeholder="Apellido"
                  name="apellido"
                  value={cliente.apellido}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cedula">Cédula</label>
                <input
                  placeholder="1108596317"
                  name="cedula"
                  value={cliente.cedula}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sexo">Sexo</label>
                <input
                  placeholder="Femenino o Masculino"
                  value={cliente.sexo}
                  name="sexo"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
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

export default connect(null, { createCliente })(ClienteFormulario);
