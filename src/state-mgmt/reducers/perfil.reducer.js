import {
  FETCH_PERFILES,
  FETCH_PERFIL,
  CREATE_PERFIL,
  DELETE_PERFIL,
} from "../types/perfil.types";

const initialState = {
  perfiles: [],
  perfil: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PERFILES:
      return {
        ...state,
        perfiles: action.payload,
      };
    case FETCH_PERFIL:
      return {
        ...state,
        perfil: action.payload,
      };
    case CREATE_PERFIL:
      return {
        ...state,
      };
    case DELETE_PERFIL:
      return {
        ...state,
        perfiles: state.perfiles.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
}
