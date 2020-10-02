import {
  FETCH_SUCURSALES,
  FETCH_SUCURSAL,
  UPDATE_SUCURSAL,
  CREATE_SUCURSAL,
  DELETE_SUCURSAL,
} from "../types/sucursal.types";

const initialState = {
  sucursales: [],
  sucursal: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCURSALES:
      return {
        ...state,
        sucursales: action.payload,
      };
    case FETCH_SUCURSAL:
      return {
        ...state,
        sucursal: action.payload,
      };
    case FETCH_SUCURSAL:
      return {
        ...state,
        sucursal: action.payload,
      };
    case UPDATE_SUCURSAL:
      return {
        ...state,
        sucursal: action.payload,
      };
    case CREATE_SUCURSAL:
      return {
        ...state,
        sucursal: action.payload,
      };
    case DELETE_SUCURSAL:
      return {
        ...state,
        sucursales: state.sucursals.filter(
          (sucursal) => sucursal._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
