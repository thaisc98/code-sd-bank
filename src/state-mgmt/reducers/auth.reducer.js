import {
  INICIAR_SESION,
  OBTENER_USUARIO_ACTUAL,
  REGISTRARSE,
  CERRAR_SESION,
  OBTENER_ADMIN,
} from "../types/auth.types";

const initialState = {
  usuarioActual: JSON.parse(localStorage.getItem("usuarioActual")) || {},
  admin: JSON.parse(localStorage.getItem("admin")) || {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTRARSE:
      return {
        ...state,
        usuarioActual: {
          token: action.payload.token,
          email: action.payload.email,
        },
        admin: action.payload.entidad,
      };
    case OBTENER_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case INICIAR_SESION:
      return {
        ...state,
        usuarioActual: {
          token: action.payload.token,
          email: action.payload.email,
        },
        admin: action.payload.entidad,
      };
    case OBTENER_USUARIO_ACTUAL:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    case CERRAR_SESION:
      return {
        ...state,
        usuarioActual: action.payload,
      };
    default:
      return state;
  }
}
