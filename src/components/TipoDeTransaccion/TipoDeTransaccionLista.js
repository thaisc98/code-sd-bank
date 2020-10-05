import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import notyf from "../../utils/notyf";
import alertify from "alertifyjs";
import { getReadibleDate } from "../../utils/date-formatter";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Table, Button } from "antd";
import {
  fetchTiposDeTransacciones,
  deleteTipoDeTransaccion,
} from "../../state-mgmt/actions/tipo-de-transaccion.actions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TipoDeTransaccionLista = ({
  fetchTiposDeTransacciones,
  tiposDeTransacciones,
  deleteTipoDeTransaccion,
}) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchTiposDeTransacciones();
  }, []);

  const columns = [
    {
      title: "Descripción",
      dataIndex: "tipo",
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
      render: (_, tipoDeTransaccion) => (
        <span>
          <Link to={`tipos-de-transacciones/${tipoDeTransaccion._id}/editar`}>
            <EditOutlined style={editIStyles} />
          </Link>
          <DeleteOutlined
            onClick={(event) =>
              onDeleteTipoDeTransaccion(tipoDeTransaccion.key, event)
            }
            style={deleteIStyles}
          />
        </span>
      ),
    },
  ];

  const onDeleteTipoDeTransaccion = (_id, event) => {
    event.preventDefault();

    alertify.confirm(
      "Confirmar eliminación",
      "¿Seguro que desea eliminar este tipo de transacción?",
      async () => {
        try {
          await deleteTipoDeTransaccion(_id);

          notyf.success("Tipo de transacción eliminado satisfactoriamente.");
        } catch (error) {
          notyf.error(error.response.data.error);
        }
      },
      () => undefined
    );
  };

  const dataMapped =
    tiposDeTransacciones &&
    tiposDeTransacciones.map((tipoDeTransaccion) => ({
      ...tipoDeTransaccion,
      createdAt: getReadibleDate(tipoDeTransaccion.createdAt),
      updatedAt: getReadibleDate(tipoDeTransaccion.updatedAt),
      key: tipoDeTransaccion._id,
    }));

  const editIStyles = {
    color: "#48db27",
    fontSize: "1.2rem",
    marginRight: "20px",
  };

  const deleteIStyles = {
    color: "#f52d1b",
    fontSize: "1.2rem",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "1.5rem",
  };

  const createBtnStyles = {
    marginBottom: ".8rem",
  };

  const { Content } = Layout;

  return (
    <Content className="container mt-4">
      <h2 style={titleStyles}>Tipos de transacciones</h2>
      <Button
        type="primary"
        style={createBtnStyles}
        onClick={() => setCreate(true)}
      >
        Nuevo tipo de transacción <i className="fas fa-plus-square ml-2"></i>
      </Button>
      {create && <Redirect to="/tipos-de-transacciones/crear"></Redirect>}
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
  tiposDeTransacciones: state.tiposDeTransacciones.tiposDeTransacciones,
});

export default connect(mapStateToProps, {
  fetchTiposDeTransacciones,
  deleteTipoDeTransaccion,
})(TipoDeTransaccionLista);
