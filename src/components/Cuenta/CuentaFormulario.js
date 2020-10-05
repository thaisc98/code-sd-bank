import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createCuenta } from "../../state-mgmt/actions/cuenta.actions";
import { fetchClientes } from "../../state-mgmt/actions/cliente.actions";
import { Form, Input, Button, Radio, Select } from "antd";
import notyf from "../../utils/notyf";

const INITIAL_CUENTA = {
  numero_de_cuenta: "",
};

const paddingClientes = {
  padding: "50px",
};

const CuentaFormulario = ({ createCuenta, clientes, fetchClientes }) => {
  const [cuenta, setCuenta] = useState(INITIAL_CUENTA);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);
  const [clienteSelected, setClienteSelected] = useState();
  const [tipoDeCuenta, setTipoDeCuenta] = useState();

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(cuenta).every((v) => Boolean(v));

    setValido(formularioValido && clienteSelected);
  }, [cuenta, clienteSelected]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError(undefined);
    setCuenta((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("cuenta", cuenta);
    console.log("tipoDeCuenta", tipoDeCuenta);
    try {
      await createCuenta({
        ...cuenta,
        tipo_de_cuenta: tipoDeCuenta,
        cliente_id: clienteSelected,
      });

      notyf.success("Cuenta creada satisfactoriamente!");
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

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <div className="container mt-4">
      <div className="row " style={paddingClientes}>
        {success && <Redirect to="/cuentas"></Redirect>}
        <div>
          <div>
            <h4>Crear cuenta</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"tipo_de_cuenta"}
                label="Tipo de Cuenta"
                rules={[{ required: true }]}
              >
                <Radio.Group
                  onChange={(e) => setTipoDeCuenta(e.target.value)}
                  value={tipoDeCuenta}
                >
                  <Radio style={radioStyle} value={"Ahorro"}>
                    Ahorro
                  </Radio>
                  <Radio style={radioStyle} value={"Corriente"}>
                    Corriente
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name={"numero_de_cuenta"}
                label="Numero de cuenta"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Número de cuenta"
                  name="numero_de_cuenta"
                  maxLength="10"
                  value={cuenta.numero_de_cuenta}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                name={"cliente"}
                label="Cliente"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  style={{ width: 250 }}
                  name="cliente"
                  value={clienteSelected}
                  onChange={(cliente) => setClienteSelected(cliente)}
                  placeholder="Seleccione el cliente"
                  optionFilterProp="children"
                >
                  {clientes &&
                    clientes.map((cliente) => (
                      <Select.Option key={cliente._id} value={cliente._id}>
                        {cliente.nombre} {cliente.apellido}
                      </Select.Option>
                    ))}
                </Select>
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
  clientes: state.clientes.clientes,
});

export default connect(mapStateToProps, { createCuenta, fetchClientes })(
  CuentaFormulario
);
