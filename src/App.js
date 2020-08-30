import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/state-mgmt/store/index";
import "./App.css";
import ClienteLista from "./components/Cliente/ClienteLista";
import ClienteFormulario from "./components/Cliente/ClienteFormulario";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App container">
          <Route path="/" exact component={Home} />
          <Route path="/clientes" exact component={ClienteLista} />
          <Route path="/clientes/crear" exact component={ClienteFormulario} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
