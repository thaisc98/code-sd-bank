import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import { fetchCuentas } from "../../state-mgmt/actions/cuenta.actions";

import { Table, Button } from "antd";
import { getReadibleDate } from "../../utils/date-formatter";
import { connect } from "react-redux";

const CuentaLista = ({ fetchCuentas, cuentas }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchCuentas();
  }, []);

  const columns = [
    {
      title: "Número",
      dataIndex: "numero_de_cuenta",
    },
    {
      title: "Balanace disponible",
      dataIndex: "balance_disponible",
    },
    {
      title: "Cantidad total en tránsito",
      dataIndex: "cantidad_total_en_transito",
    },

    {
      title: "Fecha de creación",
      dataIndex: "createdAt",
    },
    {
      title: "Última actualización",
      dataIndex: "updatedAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, cuenta) => (
        <span>
          <i className="fas fa-eye details-i-styles"></i>
        </span>
      ),
    },
  ];

  const dataMapped =
    cuentas &&
    cuentas.map((cuenta) => ({
      ...cuenta,
      createdAt: getReadibleDate(cuenta.createdAt),
      updatedAt: getReadibleDate(cuenta.updatedAt),
      balance_disponible: `RD$${cuenta.balance_disponible.toLocaleString()}`,
      cantidad_total_en_transito: `RD$${cuenta.cantidad_total_en_transito.toLocaleString()}`,
      key: cuenta._id,
    }));

  const { Content } = Layout;

  return (
    <Content className="container mt-4">
      {create && <Redirect to="/cuentas/crear"></Redirect>}
      <h2 className="title-styles">Cuentas</h2>
      <Button
        type="primary"
        style={{ marginBottom: ".8rem" }}
        onClick={() => setCreate(true)}
      >
        Nueva cuenta <i className="fas fa-plus-square ml-2"></i>
      </Button>
      <Table
        className="ant-table"
        columns={columns}
        bordered
        dataSource={dataMapped}
      />
    </Content>
  );
};

const mapStateToProps = (state) => ({
  cuentas: state.cuentas.cuentas,
});

export default connect(mapStateToProps, { fetchCuentas })(CuentaLista);
