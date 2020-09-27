import { combineReducers } from "redux";
import clienteReducer from "./cliente-reducers";
import perfilesReducer from "./perfil-reducers";
import authReducer from "./auth-reducer";

export default combineReducers({
  auth: authReducer,
  perfiles: perfilesReducer,
  clientes: clienteReducer,
});
