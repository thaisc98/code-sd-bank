import { combineReducers } from "redux";
import clienteReducers from "./cliente-reducers";

export default combineReducers({
  clientes: clienteReducers,
});
