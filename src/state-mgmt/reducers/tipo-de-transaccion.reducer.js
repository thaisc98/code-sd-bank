import {
  FETCH_TIPO_DE_TRANSACCIONES,
  FETCH_TIPO_DE_TRANSACCION,
  CREATE_TIPO_DE_TRANSACCION,
  DELETE_TIPO_DE_TRANSACCION,
} from "../types/tipo-de-transacciones.types";

const initialState = {
  tiposDeTransacciones: [],
  tipoDeTransaccionActual: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TIPO_DE_TRANSACCION:
      return {
        ...state,
        tipoDeTransaccionActual: action.payload,
      };
    case FETCH_TIPO_DE_TRANSACCIONES:
      return {
        ...state,
        tiposDeTransacciones: action.payload,
      };

    case CREATE_TIPO_DE_TRANSACCION:
      return {
        ...state,
      };
    case DELETE_TIPO_DE_TRANSACCION:
      return {
        ...state,
        tiposDeTransacciones: state.tiposDeTransacciones.filter(
          (tipoDeTransaccion) => tipoDeTransaccion._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
