import {
 FETCH_PRESTAMOS,
 FETCH_PRESTAMO,
 CREATE_PRESTAMO,
 UPDATE_PRESTAMO
  } from "../types/prestamo.types";
  
  const initialState = {
    prestamos: [],
    prestamo: {},
    prestamoActual: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_PRESTAMOS:
        console.log('rs',action.payload);
        return {
            ...state,
            prestamos: action.payload,
        };
      case FETCH_PRESTAMO:
        return {
          ...state,
          prestamoActual: action.payload,
        };
      case CREATE_PRESTAMO:
        return {
          ...state,
          prestamo: action.payload,
        };
      default:
        return state;
    }
  }
  