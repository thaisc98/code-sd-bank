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
import UsuarioCajeroRegistro from "../Cajero/UsuarioCajeroRegistro";
import SecuredRoute from "./SecuredRoute";
import AuthRoute from "./AuthRoute";
import PerfilFormulario from "../Perfil/PerfilFormulario";
import InicioSesion from "../Auth/InicioSesion";

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

          <AuthRoute path="/auth/inicio-sesion" component={InicioSesion} />
          <AuthRoute path="/auth/registro" component={Registro} />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
