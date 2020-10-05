import {
  FETCH_USUARIOS,
  FETCH_USUARIO,
  FETCH_ENTIDAD_BY_USUARIO_ID,
  FETCH_ENTIDADES_BY_PERFIL,
  CERRAR_DETALLES,
  UPDATE_USUARIO,
  CREATE_USUARIO,
  DELETE_USUARIO,
} from "../types/usuario.types";

const initialState = {
  usuarios: [],
  usuario: {},
  entidadAsociada: null,
  entidadesAsociadas: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case FETCH_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case FETCH_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case FETCH_ENTIDAD_BY_USUARIO_ID:
      return {
        ...state,
        entidadAsociada: action.payload,
      };
    case FETCH_ENTIDADES_BY_PERFIL:
      return {
        ...state,
        entidadesAsociadas: action.payload,
      };
    case UPDATE_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case CERRAR_DETALLES:
      return {
        ...state,
        usuario: action.payload.usuario,
        entidadAsociada: action.payload.entidadAsociada,
      };
    case CREATE_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case DELETE_USUARIO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (usuario) => usuario._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
