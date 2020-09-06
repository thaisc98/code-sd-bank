import { combineReducers } from "redux";
import clienteReducers from "./cliente-reducers";
import perfilesReducers from "./perfil-reducers";

export default combineReducers({
  clientes: clienteReducers,
  perfiles: perfilesReducers,
});
