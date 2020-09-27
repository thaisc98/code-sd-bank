import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import notyf from "../../utils/notyf";
import { Redirect } from "react-router-dom";
import { Form, Input, InputNumber, Button } from "antd";
import {
  fetchAdminByCedula,
  registrarse,
} from "../../state-mgmt/actions/auth-action";

const USUARIO_INICIAL = {
  cedula: "",
  email: "",
  contrasenia: "",
  confirmacionContrasenia: "",
  perfil: "Admin",
  tipo_entidad_asociada: "Admin",
};

const Registro = ({ registrarse, admin, fetchAdminByCedula }) => {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [error, setError] = useState("");
  const [cedulaValida, setCedulaValida] = useState(false);
  const [redireccion, setRedireccion] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(usuario).every((v) => Boolean(v));

    formularioValido ? setDeshabilitado(false) : setDeshabilitado(true);
  }, [usuario]);

  useEffect(() => {
    setError(undefined);

    if (usuario.cedula.length === 11) {
      fetchAdminByCedula(usuario.cedula)
        .then(() => setCedulaValida(true))
        .catch((error) => {
          setError(error.response.data.error);
          setCedulaValida(false);
        });
    } else {
      setUsuario((state) => ({
        ...state,
        email: "",
        confirmacionContrasenia: "",
        contrasenia: "",
      }));
      setCedulaValida(false);
    }
  }, [usuario.cedula]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setUsuario((prevState) => ({ ...prevState, [name]: value }));
  };

  const validationMessages = {
    required: "${label} es obligatorio!",
    types: {
      email: "${label} no es un email válido!",
      number: "${label} no es un número válido!",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max} caracteres",
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

        await registrarse({ ...usuario });

        notyf.success("¡Usuario creado exitosamente!");

        setTimeout(() => setRedireccion(true), 1500);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {redireccion ? (
        <Redirect to="/" />
      ) : (
        <div className="container">
          <div className=" col-md-6">
            <h4 className="mb-4">Registrarse</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validationMessages}
            >
              {admin && cedulaValida && (
                <Form.Item label="Nombre completo">
                  <h6 hidden>{admin.apellido}</h6>
                  <Input
                    name="nombreCompleto"
                    value={`${admin.nombre} ${admin.apellido}`}
                    className="form-control"
                    contentEditable="false"
                    onChange={handleChange}
                  />
                </Form.Item>
              )}
              <Form.Item
                name={"cedula"}
                label="Cédula"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Cédula"
                  name="cedula"
                  maxLength="11"
                  value={usuario.cedula}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
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

Registro.propTypes = {
  fetchAdminByCedula: PropTypes.func.isRequired,
  registrarse: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.auth.admin,
});

export default connect(mapStateToProps, {
  registrarse,
  fetchAdminByCedula,
})(Registro);
