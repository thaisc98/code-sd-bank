import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/state-mgmt/store/index";
import "./App.css";
import Home from "./components/Home/Home";
import LayoutApp from "./components/Navbar/LayoutApp";
import ClienteV2 from "./components/Cliente/ClienteV2";
import PerfilV2 from "./components/Perfil/PerfilV2";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <LayoutApp>
          {/* <Route path="/clientes/crear" exact component={ClienteFormulario} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/clientes" exact component={ClienteV2} />
          <Route path="/perfiles" exact component={PerfilV2} />
        </LayoutApp>
      </Router>
    </Provider>
  );
}

export default App;
