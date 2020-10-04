import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateCliente,
  fetchClienteById,
} from "../../state-mgmt/actions/cliente.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const paddingCliente = {
  padding: "50px",
};

const ClienteActualizar = ({
  match,
  updateCliente,
  clienteActual,
  fetchClienteById,
}) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    sexo: "",
  });

  useEffect(() => {
    console.log(match.params._id);
    fetchClienteById(match.params._id);
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const clienteId = match.params._id;

    fetchClienteById(clienteId).then(() =>
      setCliente({
        nombre: clienteActual.nombre,
        apellido: clienteActual.apellido,
        cedula: clienteActual.cedula,
        sexo: clienteActual.sexo,
      })
    );
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(cliente).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [cliente]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setCliente((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateCliente(match.params._id, { ...cliente });

      notyf.success("Cliente actualizado satisfactoriamente.");
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
        {success && <Redirect to="/clientes"></Redirect>}
        {clienteActual && (
          <div>
            <h4>Actualizar el cliente</h4>
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
                  value={cliente.nombre}
                  placeholder={clienteActual.tipo}
                  name="nombre"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"apellido"}
                label="Apellido"
                rules={[{ required: true }]}
              >
                <Input
                  value={cliente.apellido}
                  placeholder={clienteActual.apellido}
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
  clienteActual: state.clientes.clienteActual,
});

export default connect(mapStateToProps, {
  updateCliente,
  fetchClienteById,
})(ClienteActualizar);
