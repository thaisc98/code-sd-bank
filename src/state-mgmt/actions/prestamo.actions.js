import {
    FETCH_PRESTAMOS,
    FETCH_PRESTAMO,
    CREATE_PRESTAMO,
    UPDATE_PRESTAMO
  } from "../types/prestamo.types";
  import axios from "axios";
  import { API_URL } from "../../utils/constants";
  
  export const fetchPrestamos = () => async (dispatch) => {
    const { data } = await axios.get(`${API_URL}/prestamos`);
    console.log('dataaaa', data);
    dispatch({
      type: FETCH_PRESTAMOS,
      payload: data,
    });
  };
  
  export const fetchPrestamoByClienteId = (_id) => async (dispatch) => {
    const { data } = await axios.get(`${API_URL}/prestamos/${_id}`);
  
    dispatch({
      type: FETCH_PRESTAMO,
      payload: data,
    });
  };
  
  export const createPrestamo = (prestamo) => async (dispatch) => {
    const headers = {
      "content-type": "application/json",
    };
  
    const { data } = await axios.post(`${API_URL}/prestamos`, prestamo, headers);
  
    dispatch({
      type:CREATE_PRESTAMO,
      payload: data,
    });
  };
  
  export const updatePrestamo = (_id, prestamo) => async (dispatch) => {
    const headers = {
      "content-type": "application/json",
    };
  
    const { data } = await axios.put(
      `${API_URL}/prestamo/${_id}`,
      prestamo,
      headers
    );
  
    dispatch({
      type: UPDATE_PRESTAMO,
      payload: data,
    });
  };
  

  