import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateCajero,
  fetchCajeroById,
} from "../../state-mgmt/actions/cajero.actions";
import { fetchSucursales } from "../../state-mgmt/actions/sucursal.actions";
import { Form, Input, Button, Select } from "antd";
import notyf from "../../utils/notyf";

const paddingCliente = {
  padding: "50px",
};

const CajeroActualizar = ({
  match,
  updateCajero,
  cajeroActual,
  fetchCajeroById,
  fetchSucursales,
  sucursales,
}) => {
  const [cajero, setCajero] = useState({
    cedula: "",
    nombre: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);
  const [sucursalSelected, setSucursalSelected] = useState();

  const { Option } = Select;

  useEffect(() => {
    fetchCajeroById(match.params._id);
    fetchSucursales();
  }, []);

  useEffect(() => {
    const cajeroId = match.params._id;

    fetchCajeroById(cajeroId).then(() =>
      setCajero({
        cedula: cajeroActual.cajeroActual,
        cedula: cajeroActual.cajeroActual,
      })
    );
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
      await updateCajero(match.params._id, {
        ...cajero,
        sucursal_id: sucursalSelected,
      });

      notyf.success("¡Cajero actualizado satisfactoriamente.!");
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
        {success && <Redirect to="/cajeros"></Redirect>}
        {cajeroActual && (
          <div>
            <h4>Actualizar el cajero</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"cedula"}
                label="Cédula"
                rules={[{ required: true }]}
              >
                <Input
                  value={cajeroActual.cedula}
                  placeholder={cajeroActual.cedula}
                  name="cedula"
                  maxLength="11"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"nombre"}
                label="Nombre"
                rules={[{ required: true }]}
              >
                <Input
                  value={cajeroActual.nombre}
                  placeholder={cajeroActual.nombre}
                  name="Nombre"
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
  cajeroActual: state.cajeros.cajeroActual,
  sucursales: state.sucursales.sucursales,
});

export default connect(mapStateToProps, {
  updateCajero,
  fetchCajeroById,
  fetchSucursales,
})(CajeroActualizar);
