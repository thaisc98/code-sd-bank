import { combineReducers } from "redux";
import clienteReducer from "./cliente.reducer";
import perfilesReducer from "./perfil.reducer";
import authReducer from "./auth.reducer";
import cajeroReducer from "./cajero-reducer";
import sucursalesReducer from "./sucursal.reducer";

export default combineReducers({
  auth: authReducer,
  perfiles: perfilesReducer,
  clientes: clienteReducer,
  cajeros: cajeroReducer,
  sucursales: sucursalesReducer,
});
