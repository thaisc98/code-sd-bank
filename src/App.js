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
import SideBar from "./components/SideBar/SideBar";
import PerfilLista from "./components/Perfil/PerfilLista";
import PerfilFormulario from "./components/Perfil/PerfilFormulario";

function App() {
  return (
    <Provider store={store}>
      <Header />
      {/* <LayoutApp></LayoutApp> */}

      <Router>
        <div className="row no-gutter">
          <div>
            <SideBar />
          </div>
          <div className="ml-5 mt-4">
            <Route path="/" exact component={Home} />
            <Route path="/clientes/crear" exact component={ClienteFormulario} />
            <Route path="/clientes" exact component={ClienteLista} />
            <Route path="/perfiles" exact component={PerfilLista} />
            <Route path="/perfiles/crear" exact component={PerfilFormulario} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
