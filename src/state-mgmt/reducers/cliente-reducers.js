import {
  FETCH_CLIENTES,
  FETCH_CLIENTE,
  CREATE_CLIENTE,
  DELETE_CLIENTE,
} from "../types/cliente-types";

const initialState = {
  clientes: [],
  cliente: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };
    case FETCH_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case CREATE_CLIENTE:
      return {
        ...state,
      };
    case DELETE_CLIENTE:
      return {
        ...state,
        clientes: state.clientes.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
}
