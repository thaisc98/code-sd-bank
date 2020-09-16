import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createCliente } from "../../state-mgmt/actions/cliente-actions";
import { Form, Input, InputNumber, Button } from "antd";

const INITIAL_CLIENTE = {
  cedula: "",
  nombre: "",
  apellido: "",
  sexo: "",
};

const paddingclientes = {
  padding: "50px",
};

const ClienteFormulario = ({ createCliente }) => {
  const [cliente, setCliente] = useState(INITIAL_CLIENTE);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

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
    console.log(event);
    event.preventDefault();

    try {
      setCliente((prev) => ({
        ...prev,
      }));

      await createCliente(cliente);

      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onFinish = (values) => {};

  return (
    <div className="row " style={paddingclientes}>
      {success && <Redirect to="/clientes"></Redirect>}
      <div>
        <div>
          <h4>Crear cliente</h4>
          <Form onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item
              name={"nombre"}
              label="Nombre"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Nombre"
                name="nombre"
                value={cliente.nombre}
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
                placeholder="Apellido"
                name="apellido"
                value={cliente.apellido}
                className="form-control"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name={"cedula"}
              label="Cedula"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="402-XXX-XXXX"
                name="cedula"
                value={cliente.cedula}
                className="form-control"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name={"sexp"} label="Sexo" rules={[{ required: true }]}>
              <Input
                placeholder="Femenino o Masculino"
                value={cliente.sexo}
                name="sexo"
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
            {/* <button
              type="submit"
              disabled={!valido}
              className="btn btn-success btn-block"
            > */}
            {/* <i className="fas fa-database"></i> Crear */}
            {/* </button> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createCliente })(ClienteFormulario);
