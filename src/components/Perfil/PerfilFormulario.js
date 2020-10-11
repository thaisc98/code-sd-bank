import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPerfil } from "../../state-mgmt/actions/perfil.actions";
import { Form, Input, Button, Radio } from "antd";
import notyf from "../../utils/notyf";

const INITIAL_PERFIL = {
  rol: "",
  descripcion: "",
  tipo_entidad_asociada: "",
};

const paddingclientes = {
  padding: "50px",
};

const PerfilFormulario = ({ createPerfil }) => {
  const [perfil, setPerfil] = useState(INITIAL_PERFIL);
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(perfil).every((value) =>
      Boolean(value)
    );
    setDeshabilitado(!formularioValido);
  }, [perfil]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setPerfil((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setPerfil((prev) => ({
        ...prev,
      }));

      await createPerfil({ ...perfil });

      notyf.success("Perfil agregado satisfactoriamente.");

      setSuccess(true);
    } catch (error) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("No se pudo crear el perfil.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row " style={paddingclientes}>
        {success && <Redirect to="/perfiles"></Redirect>}
        <div>
          <div>
            <h4>Crear perfil</h4>
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
                label="Descripción"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Descripción"
                  name="descripcion"
                  value={perfil.descripcion}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"tipo_entidad_asociada"}
                label="Entidad Asociada"
                rules={[{ required: true }]}
              >
                <Radio.Group
                  onChange={handleChange}
                  name="tipo_entidad_asociada"
                  value={perfil.tipo_entidad_asociada}
                >
                  <Radio value={"Cliente"}>Cliente</Radio>
                  <Radio value={"Cajero"}>Cajero</Radio>
                  <Radio value={"Admin"}>Administrador</Radio>
                </Radio.Group>
              </Form.Item>

              {error && (
                <div className="error-text">
                  <h3>
                    <i class="fas fa-exclamation-circle"></i> Error
                  </h3>
                  <p>{error}</p>
                </div>
              )}
              <Button type="primary" disabled={deshabilitado} htmlType="submit">
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
