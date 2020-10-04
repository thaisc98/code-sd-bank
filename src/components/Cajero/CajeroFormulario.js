import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createCajero } from "../../state-mgmt/actions/cajero.actions";
import { fetchSucursales } from "../../state-mgmt/actions/sucursal.actions";
import PropTypes from "prop-types";
import { Form, Input, Select, Button } from "antd";
import notyf from "../../utils/notyf";

const { Option } = Select;

const INITIAL_CAJERO = {
  cedula: "",
  nombre: "",
  apellido: "",
  sexo: "",
};

const paddingCajeros = {
  padding: "50px",
};

const CajeroFormulario = ({ createCajero, sucursales, fetchSucursales }) => {
  const [cajero, setCajero] = useState(INITIAL_CAJERO);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);
  const [sucursalSelected, setSucursalSelected] = useState();

  useEffect(() => {
    fetchSucursales();
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(cajero).every((v) => Boolean(v));

    setValido(formularioValido && sucursalSelected);
  }, [cajero, sucursalSelected]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setCajero((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createCajero({ ...cajero, sucursal_id: sucursalSelected });

      notyf.success("¡Cajero creado satisfactoriamente!");

      setSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const validateMessages = {
    required: "${label} es obligatorio.",
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
      <div className="row " style={paddingCajeros}>
        {success && <Redirect to="/cajeros"></Redirect>}
        <div>
          <div>
            <h4 className="mb-4">Crear cajero</h4>
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
                  value={cajero.nombre}
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
                  value={cajero.apellido}
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
                  placeholder="Cédula"
                  maxLength="11"
                  name="cedula"
                  value={cajero.cedula}
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"sexo"}
                label="Sexo"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Femenino o Masculino"
                  value={cajero.sexo}
                  name="sexo"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"sucursal"}
                label="Sucursal"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  style={{ width: 250 }}
                  name="sucursal"
                  value={sucursalSelected}
                  onChange={(sucursal) => setSucursalSelected(sucursal)}
                  placeholder="Seleccione una sucursal"
                  optionFilterProp="children"
                >
                  {sucursales &&
                    sucursales.map((sucursal) => (
                      <Option key={sucursal._id} value={sucursal._id}>
                        {sucursal.nombre}
                      </Option>
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

CajeroFormulario.propTypes = {
  sucursales: PropTypes.array.isRequired,
  fetchSucursales: PropTypes.func.isRequired,
  createCajero: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sucursales: state.sucursales.sucursales,
});

export default connect(mapStateToProps, { createCajero, fetchSucursales })(
  CajeroFormulario
);
