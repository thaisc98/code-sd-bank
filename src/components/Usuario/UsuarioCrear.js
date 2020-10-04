import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import notyf from "../../utils/notyf";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import {
  createUsuario,
  fetchEntidadesByPerfil,
} from "../../state-mgmt/actions/usuario.actions";
import { fetchPerfiles } from "../../state-mgmt/actions/perfil.actions";

const { Option } = Select;

const USUARIO_INICIAL = {
  email: "",
  contrasenia: "",
  confirmacionContrasenia: "",
};

const UsuarioCrear = ({
  createUsuario,
  fetchPerfiles,
  perfiles,
  fetchEntidadesByPerfil,
  entidadesAsociadas,
}) => {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  //   const [deshabilitado, setDeshabilitado] = useState(true);
  const [valido, setValido] = useState(false);
  const [editable, setEditable] = useState(false);

  const [error, setError] = useState("");
  const [redireccion, setRedireccion] = useState(false);
  const [perfilSelected, setPerfilSelected] = useState("");
  const [entidadSelected, setEntidadSelected] = useState();
  const [tipoEntidad, setTipoEntidad] = useState("");

  useEffect(() => {
    fetchPerfiles();
  }, []);

  useEffect(() => {
    setEditable(Boolean(perfilSelected));

    if (perfiles.length > 0) {
      const tipoDeEntidadAsociada = perfiles.find(
        (perfil) => String(perfil._id) === String(perfilSelected)
      );

      if (tipoDeEntidadAsociada) {
        setTipoEntidad(
          tipoDeEntidadAsociada.tipo_entidad_asociada
            ? tipoDeEntidadAsociada.tipo_entidad_asociada
            : ""
        );
      }
    }

    fetchEntidadesByPerfil(perfilSelected);
  }, [perfilSelected, entidadSelected]);

  useEffect(() => {
    const formularioValido = Object.values(usuario).every((v) => Boolean(v));

    setValido(formularioValido && perfilSelected);
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

        console.log(perfilSelected);

        await createUsuario({
          ...usuario,
          tipo_entidad_asociada: tipoEntidad,
          perfil: perfilSelected,
          entidad_asociada: entidadSelected,
        });

        notyf.success("¡Usuario creado exitosamente!");

        setRedireccion(true);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {redireccion ? (
        <Redirect to="/usuarios" />
      ) : (
        <div className="container mt-4">
          <div className=" col-md-6">
            <h4 className="mb-4">Crear usuario</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validationMessages}
            >
              <Form.Item
                name={"perfil"}
                label="Perfil"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  style={{ width: 250 }}
                  name="perfil"
                  value={perfilSelected}
                  onChange={(perfil) => setPerfilSelected(perfil)}
                  placeholder="Seleccione un perfil"
                  optionFilterProp="children"
                >
                  {perfiles &&
                    perfiles.map((perfil) => (
                      <Option key={perfil._id} value={perfil._id}>
                        {perfil.rol}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={"entidad_asociada"}
                label={tipoEntidad ? tipoEntidad : "Entidad"}
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  style={{ width: 250 }}
                  name="entidad_asociada"
                  disabled={!editable}
                  value={entidadSelected}
                  onChange={(entidadAsociada) =>
                    setEntidadSelected(entidadAsociada)
                  }
                  placeholder={`Seleccione el ${
                    tipoEntidad ? tipoEntidad : "registro"
                  }`}
                  optionFilterProp="children"
                >
                  {entidadesAsociadas &&
                    entidadesAsociadas.map((entidad) => (
                      <Option key={entidad._id} value={entidad._id}>
                        {entidad.nombre} {entidad.apellido}
                      </Option>
                    ))}
                </Select>
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
              <Button type="primary" disabled={!valido} htmlType="submit">
                Registrar <i className="ml-2 far fa-save"></i>
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  perfiles: state.perfiles.perfiles,
  entidadesAsociadas: state.usuarios.entidadesAsociadas,
});

export default connect(mapStateToProps, {
  createUsuario,
  fetchEntidadesByPerfil,
  fetchPerfiles,
})(UsuarioCrear);
