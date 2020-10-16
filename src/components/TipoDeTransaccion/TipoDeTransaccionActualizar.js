import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateTipoDeTransaccion,
  fetchTipoDeTransaccionById,
} from "../../state-mgmt/actions/tipo-de-transaccion.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const INITIAL_TIPO_DE_TRANSACCION = {
  tipo: "",
};

const paddingTipoDeTransacciones = {
  padding: "50px",
};

const TipoDeTransaccionActualizar = ({
  match,
  updateTipoDeTransaccion,
  tipoDeTransaccionActual,
  fetchTipoDeTransaccionById,
}) => {
  const [tipoDeTransaccion, setTipoDeTransaccion] = useState({
    tipo: "",
  });

  useEffect(() => {
    console.log(match.params._id);
    fetchTipoDeTransaccionById(match.params._id);
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const tipoDeTransaccionId = match.params._id;

    fetchTipoDeTransaccionById(tipoDeTransaccionId).then(() =>
      setTipoDeTransaccion({
        tipo: tipoDeTransaccionActual.tipo,
      })
    );
  }, []);

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
      await updateTipoDeTransaccion(match.params._id, { ...tipoDeTransaccion });

      notyf.success("Tipo de transacción actualizado satisfactoriamente.");
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
      <div className="row " style={paddingTipoDeTransacciones}>
        {success && <Redirect to="/tipos-de-transacciones"></Redirect>}
        {tipoDeTransaccionActual && tipoDeTransaccionActual.tipo && (
          <div>
            <h4>Actualizar tipo de transacción</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"tipo"}
                label="Tipo"
                rules={[{ required: true }]}
              >
                <Input
                  value={tipoDeTransaccion.tipo}
                  placeholder={tipoDeTransaccionActual.tipo}
                  name="tipo"
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
  tipoDeTransaccionActual: state.tiposDeTransacciones.tipoDeTransaccionActual,
});

export default connect(mapStateToProps, {
  updateTipoDeTransaccion,
  fetchTipoDeTransaccionById,
})(TipoDeTransaccionActualizar);
