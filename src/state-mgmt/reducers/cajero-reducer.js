import {
  FETCH_CAJEROS,
  FETCH_CAJERO,
  UPDATE_CAJERO,
  CREATE_CAJERO,
  DELETE_CAJERO,
} from "../types/cajero-types";

const initialState = {
  cajeros: [],
  cajero: {},
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
    case FETCH_CAJERO:
      return {
        ...state,
        cajero: action.payload,
      };
    case UPDATE_CAJERO:
      return {
        ...state,
        cajero: action.payload,
      };
    case CREATE_CAJERO:
      return {
        ...state,
        cajero: action.payload,
      };
    case DELETE_CAJERO:
      return {
        ...state,
        cajeros: state.cajeros.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
}
