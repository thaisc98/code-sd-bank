import {
  FETCH_CUENTAS,
  FETCH_CUENTA,
  CREATE_CUENTA,
} from "../types/cuenta.types";

const initialState = {
  cuentas: [],
  cuenta: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CUENTAS:
      return {
        ...state,
        cuentas: action.payload,
      };
    case FETCH_CUENTA:
      return {
        ...state,
        cuenta: action.payload,
      };
    case CREATE_CUENTA:
      return {
        ...state,
        cuenta: action.payload,
      };
    default:
      return state;
  }
}
