import { combineReducers } from "redux";
import clienteReducer from "./cliente.reducer";
import perfilesReducer from "./perfil.reducer";
import authReducer from "./auth.reducer";
import cajeroReducer from "./cajero.reducer";
import sucursalesReducer from "./sucursal.reducer";
import tipoDeTransaccionReducer from "./tipo-de-transaccion.reducer";
import cuentaReducer from "./cuenta.reducer";
import prestamoReducer from "./prestamo.reducer"
import usuarioReducer from "./usuario.reducer";


export default combineReducers({
  tiposDeTransacciones: tipoDeTransaccionReducer,
  auth: authReducer,
  perfiles: perfilesReducer,
  clientes: clienteReducer,
  cajeros: cajeroReducer,
  sucursales: sucursalesReducer,
  cuentas: cuentaReducer,
  prestamos: prestamoReducer,
  usuarios: usuarioReducer,
});
