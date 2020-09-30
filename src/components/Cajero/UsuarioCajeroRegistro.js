import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import notyf from "../../utils/notyf";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  fetchCajeroById,
  crearCuentaCajero,
} from "../../state-mgmt/actions/cajero.actions";

const USUARIO_INICIAL = {
  email: "",
  contrasenia: "",
  confirmacionContrasenia: "",
  perfil: "Cajero",
  tipo_entidad_asociada: "Cajero",
};

const UsuarioCajeroRegistro = ({
  match,
  crearCuentaCajero,
  cajero,
  fetchCajeroById,
}) => {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [error, setError] = useState("");
  const [redireccion, setRedireccion] = useState(false);

  useEffect(() => {
    fetchCajeroById(match.params._id);
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(usuario).every((usuario) =>
      Boolean(usuario)
    );

    formularioValido ? setDeshabilitado(false) : setDeshabilitado(true);
  }, [usuario]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const validationMessages = {
    required: "El campo ${label} es obligatorio.",
    types: {
      email: "${label} no es un email válido.",
      number: "${label} no es un número válido.",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max} caracteres.",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      if (usuario.contrasenia !== usuario.confirmacionContrasenia) {
        setError("Las contraseñas no coinciden!");
      } else {
        setUsuario((prev) => ({
          ...prev,
        }));

        await crearCuentaCajero({ ...usuario, cedula: cajero.cedula });

        notyf.success("¡Usuario creado exitosamente!");

        setTimeout(() => setRedireccion(true), 1000);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {redireccion ? (
        <Redirect to="/cajeros" />
      ) : (
        <div className="container mt-4">
          <div className=" col-md-6">
            <h4 className="mb-4">Registrar cajero</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validationMessages}
            >
              {cajero && (
                <Form.Item label="Nombre completo">
                  <h6 hidden>{cajero.apellido}</h6>
                  <Input
                    name="nombreCompleto"
                    value={`${cajero.nombre} ${cajero.apellido}`}
                    className="form-control"
                    contentEditable="false"
                    onChange={handleChange}
                  />
                </Form.Item>
              )}
              <Form.Item
                name={"email"}
                label="Email"
                type={"email"}
                rules={[{ required: true, email: true }]}
              >
                <Input
                  placeholder="correo@gmail.com"
                  name="email"
                  value={usuario.email}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"contrasenia"}
                label="Contraseña"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Contraseña"
                  name="contrasenia"
                  value={usuario.contrasenia}
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"confirmacionContrasenia"}
                label="Confirmación de contraseña"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Confirme su contraseña"
                  value={usuario.confirmacionContrasenia}
                  name="confirmacionContrasenia"
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              {error && (
                <div className="error-text">
                  <h3>
                    <i className="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" disabled={deshabilitado} htmlType="submit">
                Registrar <i className="ml-2 far fa-save"></i>
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

UsuarioCajeroRegistro.propTypes = {
  crearCuentaCajero: PropTypes.func.isRequired,
  cajero: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cajero: state.cajeros.cajero,
});

export default connect(mapStateToProps, {
  fetchCajeroById,
  crearCuentaCajero,
})(UsuarioCajeroRegistro);
