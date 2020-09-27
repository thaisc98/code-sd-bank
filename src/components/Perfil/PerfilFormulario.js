import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPerfil } from "../../state-mgmt/actions/perfil-actions";
import { Form, Input, Button } from "antd";

const INITIAL_PERFIL = {
  rol: "",
  descripcion: "",
};

const paddingclientes = {
  padding: "50px",
};

const PerfilFormulario = ({ createPerfil }) => {
  const [perfil, setPerfil] = useState(INITIAL_PERFIL);
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
      setPerfil((prev) => ({
        ...prev,
      }));

      await createPerfil(perfil);

      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="row " style={paddingclientes}>
        {success && <Redirect to="/perfiles"></Redirect>}
        <div>
          <div>
            <h4>Crear Perfil</h4>
            <Form onSubmitCapture={handleSubmit}>
              <Form.Item name={"rol"} label="Rol" rules={[{ required: true }]}>
                <Input
                  placeholder="Rol"
                  name="rol"
                  value={perfil.rol}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"descripcion"}
                label="Descripcion"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Descripcion"
                  name="descripcion"
                  value={perfil.descripcion}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              {error && (
                <div className="error-text">
                  <h3>
                    <i class="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" disabled={!valido} htmlType="submit">
                Crear
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createPerfil })(PerfilFormulario);
