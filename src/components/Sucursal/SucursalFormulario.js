import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createSucursal } from "../../state-mgmt/actions/sucursal.actions";
import notyf from "../../utils/notyf";
import { Form, Input, Button } from "antd";

const INITIAL_SUCURSAL = {
  nombre: "",
  ciudad: "",
  calle: "",
  numero: "",
  codigo_postal: "",
};

const paddingSucursales = {
  padding: "50px",
};

const SucursalFormulario = ({ createSucursal }) => {
  const [sucursal, setSucursal] = useState(INITIAL_SUCURSAL);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(sucursal).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [sucursal]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setSucursal((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createSucursal({ ...sucursal });

      notyf.success("¡Sacursal creado satisfactoriamente!");
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
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
    <div className="container ">
      <div className="row " style={paddingSucursales}>
        {success && <Redirect to="/sucursales"></Redirect>}
        <div>
          <div>
            <h4 className="mb-4">Crear sucursal</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"nombre"}
                label="Nombre"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Nombre"
                  name="nombre"
                  value={sucursal.nombre}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"ciudad"}
                label="Ciudad"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Ciudad"
                  name="ciudad"
                  value={sucursal.ciudad}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"calle"}
                label="Calle"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Calle"
                  name="calle"
                  value={sucursal.calle}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"numero"}
                label="Número"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Número"
                  value={sucursal.numero}
                  name="numero"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"codigo_postal"}
                label="Código postal"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Código postal"
                  value={sucursal.codigo_postal}
                  maxLength="6"
                  name="codigo_postal"
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

export default connect(null, { createSucursal })(SucursalFormulario);
