import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../../state-mgmt/store/index";
import "./App.css";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ClienteLista from "../Cliente/ClienteLista";
import ClienteFormulario from "../Cliente/ClienteFormulario";
import Registro from "../Auth/Registro";
import PerfilLista from "../Perfil/PerfilLista";
import SecuredRoute from "./SecuredRoute";
import AuthRoute from "./AuthRoute";
import PerfilFormulario from "../Perfil/PerfilFormulario";
import "notyf/notyf.min.css";

const titleStyles = {
  margin: "auto",
  with: "auto",
  padding: "20px",
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div style={titleStyles}>
          <Route path="/" exact component={Home} />
          <SecuredRoute
            path="/perfiles/crear"
            component={PerfilFormulario}
          />
          <SecuredRoute
            path="/clientes/crear"
            component={ClienteFormulario}
          />
          <SecuredRoute path="/clientes"  component={ClienteLista} />

          <SecuredRoute path="/perfiles"  component={PerfilLista} />

          <AuthRoute path="/auth/registro"  component={Registro} />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
