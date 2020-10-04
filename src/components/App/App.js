import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../../state-mgmt/store/index";
import "./App.scss";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ClienteLista from "../Cliente/ClienteLista";
import ClienteFormulario from "../Cliente/ClienteFormulario";
import Registro from "../Auth/Registro";
import PerfilLista from "../Perfil/PerfilLista";
import SucursalLista from "../Sucursal/SucursalLista";
import SucursalFormulario from "../Sucursal/SucursalFormulario";
import CajeroLista from "../Cajero/CajeroLista";
import CajeroDetalles from "../Cajero/CajeroDetalles";
import CajeroFormulario from "../Cajero/CajeroFormulario";
import TipoDeTransaccionLista from "../TipoDeTransaccion/TipoDeTransaccionLista";
import UsuarioCajeroRegistro from "../Cajero/UsuarioCajeroRegistro";
import SecuredRoute from "./SecuredRoute";
import AuthRoute from "./AuthRoute";
import PerfilFormulario from "../Perfil/PerfilFormulario";
import TipoDeTransaccionAgregar from "../TipoDeTransaccion/TipoDeTransaccionAgregar";
import TipoDeTransaccionActualizar from "../TipoDeTransaccion/TipoDeTransaccionActualizar";
import CuentaLista from "../Cuenta/CuentaLista";
import InicioSesion from "../Auth/InicioSesion";
import ClienteActualizar from "../Cliente/ClienteActualizar";

import "notyf/notyf.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div>
          <Route path="/" exact component={Home} />
          <SecuredRoute path="/perfiles/crear" component={PerfilFormulario} />

          <SecuredRoute path="/clientes/crear" component={ClienteFormulario} />
          <SecuredRoute path="/clientes" component={ClienteLista} />
          <SecuredRoute
            path="/clientes/:_id/editar"
            component={ClienteActualizar}
          />

          <SecuredRoute
            path="/sucursales/crear"
            component={SucursalFormulario}
          />

          <SecuredRoute path="/sucursales" component={SucursalLista} />

          <SecuredRoute path="/cajeros/crear" component={CajeroFormulario} />

          <SecuredRoute
            path="/cajeros/:_id/auth/registrar"
            component={UsuarioCajeroRegistro}
          />

          <SecuredRoute
            path="/cajeros/:_id/detalles"
            component={CajeroDetalles}
          />
          <SecuredRoute path="/cajeros" component={CajeroLista} />

          <SecuredRoute path="/perfiles" component={PerfilLista} />

          <SecuredRoute
            path="/tipos-de-transacciones"
            component={TipoDeTransaccionLista}
          />

          <SecuredRoute
            path="/tipos-de-transacciones/crear"
            component={TipoDeTransaccionAgregar}
          />

          <SecuredRoute
            path="/tipos-de-transacciones/:_id/editar"
            component={TipoDeTransaccionActualizar}
          />

          <SecuredRoute path="/cuentas" component={CuentaLista} />

          <AuthRoute path="/auth/inicio-sesion" component={InicioSesion} />
          <AuthRoute path="/auth/registro" component={Registro} />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
