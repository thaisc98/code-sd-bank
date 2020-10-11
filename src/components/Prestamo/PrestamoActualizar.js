import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updatePrestamo,
  fetchPrestamoByClienteId,
} from "../../state-mgmt/actions/prestamo.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const paddingCliente = {
  padding: "50px",
};

const PrestamoActualizar = ({
  match,
  updatePrestamo,
  prestamoActual,
  fetchPrestamoByClienteId,
}) => {
  const [prestamo, setPrestamo] = useState({descripcion: "",});

  useEffect(() => {
    console.log(match.params._id);
    fetchPrestamoByClienteId(match.params._id);
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const clienteId = match.params._id;

    fetchPrestamoByClienteId(clienteId).then(() =>
      setPrestamo({
        descripcion: prestamoActual.descripcion,
      })
    );
  }, []);

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

    console.log('prestamo', prestamo)
    try {
      await updatePrestamo(prestamoActual._id, { ...prestamo });

      notyf.success("Prestamo actualizado satisfactoriamente.");
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
        {success && <Redirect to="/prestamos"></Redirect>}
        {prestamoActual && (
          <div>
            <h4>Actualizar el prestamo</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"descripcion"}
                label="Descripción:"
                rules={[{ required: true }]}
              >
                <Input
                  value={prestamoActual.descripcion}
                  placeholder={prestamoActual.descripcion}
                  name="descripcion"
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
  prestamoActual: state.prestamos.prestamoActual,
});

export default connect(mapStateToProps, {
  updatePrestamo,
  fetchPrestamoByClienteId,
})(PrestamoActualizar);
