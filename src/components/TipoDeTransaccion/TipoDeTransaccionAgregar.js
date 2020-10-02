import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createTipoDeTransaccion } from "../../state-mgmt/actions/tipo-de-transaccion.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const INITIAL_TIPO_DE_TRANSACCION = {
  tipo: "",
};

const paddingTipoDeTransacciones = {
  padding: "50px",
};

const TipoDeTransaccionAgregar = ({
  createTipoDeTransaccion,
  tipoDeTransaccionActual,
}) => {
  const [tipoDeTransaccion, setTipoDeTransaccion] = useState(
    INITIAL_TIPO_DE_TRANSACCION
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const formularioValido = Object.values(tipoDeTransaccion).every((v) =>
      Boolean(v)
    );

    setValido(formularioValido);
  }, [tipoDeTransaccion]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setTipoDeTransaccion((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createTipoDeTransaccion({ ...tipoDeTransaccion });

      notyf.success("Tipo de transacción creado satisfactoriamente.");
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
      <div className="row " style={paddingTipoDeTransacciones}>
        {success && <Redirect to="/tipos-de-transacciones"></Redirect>}
        <div>
          <div>
            <h4>Crear tipo de transacción</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"Tipo"}
                label="tipo"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Escriba el tipo de transacción"
                  name="tipo"
                  value={tipoDeTransaccion.tipo}
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

const mapStateToProps = (state) => ({
  tipoDeTransaccionActual: state.tiposDeTransacciones.tipoDeTransaccionActual,
});

export default connect(mapStateToProps, { createTipoDeTransaccion })(
  TipoDeTransaccionAgregar
);
