import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updatePerfil,
  getPerfilById,
} from "../../state-mgmt/actions/perfil.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const paddingCliente = {
  padding: "50px",
};

const PerfilActualizar = ({
  match,
  updatePerfil,
  perfilActual,
  getPerfilById,
}) => {
  const [perfil, setPerfil] = useState({
    descripcion: "",
    rol: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    getPerfilById(match.params._id);
  }, []);

  useEffect(() => {
    const perfilId = match.params._id;

    getPerfilById(perfilId).then(() =>
      setPerfil({
        descripcion: perfilActual.descripcion,
        rol: perfilActual.rol,
      })
    );
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(perfil).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [perfil]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setPerfil((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updatePerfil(match.params._id, { ...perfil });

      notyf.success("¡Perfil actualizado satisfactoriamente.!");
      setSuccess(true);
    } catch (error) {
      notyf.error(error.response.data.error);
    }
  };

  const validateMessages = {
    required: "El campo ${label} es obligatorio.",
    types: {
      email: "${label} no es un email válido.",
      number: "${label} no es un número válido.",
    },
    number: {
      range: "${label} debe estar entre ${min} y ${max}.",
    },
  };

  return (
    <div className="container mt-4">
      <div className="row " style={paddingCliente}>
        {success && <Redirect to="/perfiles"></Redirect>}
        {perfilActual && (
          <div>
            <h4>Actualizar el perfil</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"descripcion"}
                label="Descripcion"
                rules={[{ required: true }]}
              >
                <Input
                  value={perfilActual.descripcion}
                  placeholder={perfilActual.descripcion}
                  name="nombre"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name={"rol"} label="Rol" rules={[{ required: true }]}>
                <Input
                  value={perfilActual.rol}
                  placeholder={perfilActual.rol}
                  name="Apellido"
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
                Actualizar
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  perfilActual: state.perfiles.perfilActual,
});

export default connect(mapStateToProps, {
  updatePerfil,
  getPerfilById,
})(PerfilActualizar);
