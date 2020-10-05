import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPrestamo } from "../../state-mgmt/actions/prestamo.actions";
import { Form, Input, Button, Select } from "antd";
import { fetchClientes } from "../../state-mgmt/actions/cliente.actions";
import notyf from "../../utils/notyf";

const INITIAL_CLIENTE = {
  descripcion: "",
  cantidad_total: "",
};

const paddingClientes = {
  padding: "50px",
};

const PrestamoFormulario = ({ createPrestamo, clientes, fetchClientes }) => {
  const [prestamo, setPrestamo] = useState(INITIAL_CLIENTE);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);
  const [clienteSelected, setClienteSelected] = useState();

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(prestamo).every((v) => Boolean(v));

    setValido(formularioValido && clienteSelected);
  }, [prestamo, clienteSelected]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError(undefined);
    setPrestamo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("prestamo", prestamo);

    try {
      await createPrestamo({ ...prestamo, cliente_id: clienteSelected });

      notyf.success("¡Prestamo creado satisfactoriamente!");
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
            <h4>Crear préstamo</h4>
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

export default connect(mapStateToProps, { createPrestamo, fetchClientes })(
  PrestamoFormulario
);
