import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import notyf from "../../utils/notyf";
import { Link } from "react-router-dom";
import { cerrarSesion } from "../../state-mgmt/actions/auth.actions";

import { connect } from "react-redux";

const { SubMenu } = Menu;

const { Header: HeaderL } = Layout;

const Header = ({ usuarioActual, admin, cerrarSesion }) => {
  const handleCerrarSesion = () => {
    cerrarSesion();

    notyf.success("¡Sesión cerrada exitosamente!");
  };

  return (
    <div>
      <HeaderL className="header">
        <div className="container">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">SD Bank</Link>
            </Menu.Item>
            {/* <Menu.Item key="5" onClick={() => handleClick("clientes")}> */}
            {usuarioActual.email && (
              <>
                <Menu.Item key="5">
                  <Link to="/clientes">Clientes</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/perfiles">Perfiles</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/cajeros">Cajeros</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  <Link to="/sucursales">Sucursales</Link>
                </Menu.Item>
                <Menu.Item key="12">
                  <Link to="/tipos-de-transacciones">
                    Tipos de transacciones
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  icon={<UserOutlined />}
                  title={`${admin.nombre} ${admin.apellido}`}
                >
                  <Menu.Item onClick={() => handleCerrarSesion()} key="9">
                    <Link to="/">Cerrar sesión</Link>
                  </Menu.Item>
                </SubMenu>
              </>
            )}

            {!usuarioActual.email && (
              <>
                <Menu.Item key="8">
                  <Link to="/auth/inicio-sesion">Inciar sesión</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/auth/registro">Registrarse</Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </div>
      </HeaderL>
    </div>
  );
};

const mapStateToProps = (state) => ({
  usuarioActual: state.auth.usuarioActual,
  admin: state.auth.admin,
});

export default connect(mapStateToProps, { cerrarSesion })(Header);
