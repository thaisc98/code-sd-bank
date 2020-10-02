import {
  FETCH_CAJEROS,
  FETCH_CAJERO,
  FETCH_CAJERO_BY_CEDULA,
  FETCH_USUARIO_CAJERO,
  UPDATE_CAJERO,
  CREATE_CAJERO,
  DELETE_CAJERO,
  CREATE_CUENTA_CAJERO,
} from "../types/cajero.types";

const initialState = {
  cajeros: [],
  cajero: {},
  cajeroUsuario: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CAJEROS:
      return {
        ...state,
        cajeros: action.payload,
      };
    case FETCH_CAJERO:
      return {
        ...state,
        cajero: action.payload,
      };
    case FETCH_USUARIO_CAJERO:
      return {
        ...state,
        cajeroUsuario: action.payload,
      };
    case FETCH_CAJERO_BY_CEDULA:
      return {
        ...state,
        cajero: action.payload,
      };
    case CREATE_CAJERO:
      return {
        ...state,
        cajero: action.payload,
      };
    case CREATE_CUENTA_CAJERO:
      return {
        ...state,
        cajeroUsuario: action.payload,
      };
    case UPDATE_CAJERO:
      return {
        ...state,
        cajero: action.payload,
      };

    case DELETE_CAJERO:
      return {
        ...state,
        cajeros: state.cajeros.filter(
          (cajero) => cajero._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
