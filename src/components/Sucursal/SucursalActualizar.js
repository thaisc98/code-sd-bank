import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateSucursal,
  fetchSucursalById,
} from "../../state-mgmt/actions/sucursal.actions";
import { Form, Input, Button } from "antd";
import notyf from "../../utils/notyf";

const paddingTipoDeTransacciones = {
  padding: "50px",
};

const SucursalActualizar = ({
  match,
  updateSucursal,
  sucursalActual,
  fetchSucursalById,
}) => {
  const [sucursal, setSucursal] = useState({
    nombre: "",
    ciudad: "",
  });

  useEffect(() => {
    fetchSucursalById(match.params._id);
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const sucursalId = match.params._id;

    fetchSucursalById(sucursalId).then(() =>
      setSucursal({
        nombre: sucursalActual.nombre,
        ciudad: sucursalActual.ciudad,
        calle: sucursalActual.calle,
        codigo_postal: sucursalActual.codigo_postal,
        numero: sucursalActual.numero,
      })
    );
  }, []);

  useEffect(() => {
    const formularioValido = Object.values(sucursal).every((v) => Boolean(v));

    setValido(formularioValido);
  }, [sucursal]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setError(undefined);
    setSucursal((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateSucursal(match.params._id, { ...sucursal });

      notyf.success("Sucursal actualizada satisfactoriamente.");
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
        {success && <Redirect to="/sucursales"></Redirect>}
        {sucursalActual && (
          <div>
            <h4>Actualizar sucursal</h4>
            <Form
              onSubmitCapture={(e) => handleSubmit(e)}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={"nombre"}
                label="Nombre: "
                rules={[{ required: true }]}
              >
                <Input
                  value={sucursalActual.nombre}
                  placeholder={sucursalActual.nombre}
                  name="nombre"
                  className="form-control"
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name={"ciudad"}
                label="Ciudad: "
                rules={[{ required: true }]}
              >
                <Input
                  value={sucursalActual.ciudad}
                  placeholder={sucursalActual.ciudad}
                  name="ciudad"
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
  sucursalActual: state.sucursales.sucursalActual,
});

export default connect(mapStateToProps, {
  updateSucursal,
  fetchSucursalById,
})(SucursalActualizar);
