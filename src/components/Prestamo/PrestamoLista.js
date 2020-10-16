import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Table, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPrestamos } from "../../state-mgmt/actions/prestamo.actions";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const PrestamoLista = ({ fetchPrestamos, prestamos }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const columns = [
    {
      title: "Cantidad Saldada",
      dataIndex: "cantidad_saldada",
    },
    {
      title: "Cantidad Restante",
      dataIndex: "cantidad_restante",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Cantidad Total",
      dataIndex: "cantidad_total",
    },
    {
      title: "Fecha de Registro",
      dataIndex: "createdAt",
    },
    {
      title: "Última actualización",
      dataIndex: "updatedAt",
    },
    {
      title: "Operación",
      key: "operacion",
      render: (_, prestamo) => (
        <span>
          <Link to={`/prestamos/${prestamo._id}/detalles`}>
            <EyeOutlined
              style={{
                fontSize: "1.3rem",
                marginRight: "20px",
              }}
            />
          </Link>
          <Link to={`prestamo/${prestamo._id}/editar`}>
            <EditOutlined style={editIStyles} />
          </Link>
        </span>
      ),
    },
  ];

  const dataMapped =
    prestamos &&
    prestamos.map((prestamo) => ({
      ...prestamo,
      createdAt: getReadibleDate(prestamo.createdAt),
      updatedAt: getReadibleDate(prestamo.updatedAt),
      key: prestamo._id,
    }));

  const editIStyles = {
    color: "#48db27",
    fontSize: "1.2rem",
    marginRight: "20px",
  };

  const { Content } = Layout;

  const getScrollY = () => {
    return prestamos.length > 5 ? 370 : 410;
  };

  return (
    <Content className="container mt-4">
      <h2 className="title-styles">Préstamos</h2>
      <Button
        type="primary"
        className="create-btn-styles"
        onClick={() => setCreate(true)}
      >
        Nuevo Préstamo <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/prestamos/crear"></Redirect>}
      <Table
        responsive
        pagination={{ pageSize: 4 }}
        className="ant-table"
        columns={columns}
        bordered
        dataSource={dataMapped}
      />
    </Content>
  );
};

PrestamoLista.prototypes = {
  fetchPrestamos: PropTypes.func.isRequired,
  prestamos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  prestamos: state.prestamos.prestamos,
});

export default connect(mapStateToProps, { fetchPrestamos })(PrestamoLista);
