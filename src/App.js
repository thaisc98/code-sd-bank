import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/state-mgmt/store/index";
import "./App.css";
import ClienteLista from "./components/Cliente/ClienteLista";
import ClienteFormulario from "./components/Cliente/ClienteFormulario";
import Home from "./components/Home/Home";
import PerfilLista from "./components/Perfil/PerfilLista";

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <Navbar /> */}
        <Router>
          <div className="App container">
            <Route path="/" exact component={Home} />
            <Switch>
              <Route path="/clientes/crear" component={ClienteFormulario} />
              <Route path="/clientes" component={ClienteLista} />
              <Route path="/perfiles" component={PerfilLista} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
