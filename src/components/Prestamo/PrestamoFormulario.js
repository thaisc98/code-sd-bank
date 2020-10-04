import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPrestamo } from "../../state-mgmt/actions/prestamo.actions";
import { Form, Input, Button } from "antd";

const INITIAL_CLIENTE = {
  descripcion: "",
  cantidad_total: "",
  cliente: "",
};

const paddingClientes = {
  padding: "50px",
};

const PrestamoFormulario = ({ createPrestamo }) => {
  const [prestamo, setPrestamo] = useState(INITIAL_CLIENTE);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(prestamo).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [prestamo]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setPrestamo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("prestamo", prestamo);
    try {
      await createPrestamo({ ...prestamo });

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
    <div className="container mt-4">
      <div className="row " style={paddingClientes}>
        {success && <Redirect to="/prestamos"></Redirect>}
        <div>
          <div>
            <h4>Crear prestamo</h4>
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
                  placeholder="Descripcion"
                  name="descripcion"
                  value={prestamo.descripcion}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"cantidad_total"}
                label="Cantidad Total"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Cantidad Total"
                  name="cantidad_total"
                  value={prestamo.cantidad_total}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"cliente"}
                label="Cliente"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Cliente Id"
                  name="cliente"
                  value={prestamo.cliente}
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
                Crear
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createPrestamo })(PrestamoFormulario);
