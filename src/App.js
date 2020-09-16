import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/state-mgmt/store/index";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ClienteLista from "./components/Cliente/ClienteLista";
import ClienteFormulario from "./components/Cliente/ClienteFormulario";
import PerfilLista from "./components/Perfil/PerfilLista";
import PerfilFormulario from "./components/Perfil/PerfilFormulario";

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
          <Route path="/clientes/crear" exact component={ClienteFormulario} />
          <Route path="/clientes" exact component={ClienteLista} />
          <Route path="/perfiles" exact component={PerfilLista} />
          <Route path="/perfiles/crear" exact component={PerfilFormulario} />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
