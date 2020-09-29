import {
    FETCH_SUCURSALES,
    FETCH_SUCURSAL,
    CREATE_SUCURSAL,
    UPDATE_SUCURSAL,
    DELETE_SUCURSAL,
  } from "../types/sucursal-types";
  import axios from "axios";
  import { API_URL } from "../../utils/constants";
  
  export const fetchSucursales = () => async (dispatch) => {
    const { data } = await axios.get(`${API_URL}/sucursales`);
  
    dispatch({
      type: FETCH_SUCURSALES,
      payload: data,
    });
  };
  
  export const fetchSucursalById = (_id) => async (dispatch) => {
    const { data } = await axios.get(`${API_URL}/sucursales/${_id}`);
  
    dispatch({
      type: FETCH_SUCURSAL,
      payload: data,
    });
  };
  
  export const createSucursal = (sucursal) => async (dispatch) => {
    const headers = {
      "content-type": "application/json",
    };
  
    const { data } = await axios.post(`${API_URL}/sucursales`, sucursal, headers);
  
    dispatch({
      type: CREATE_SUCURSAL,
      payload: data,
    });
  };
  
  export const updateSucursal = (_id, sucursal) => async (dispatch) => {
    const headers = {
      "content-type": "application/json",
    };
  
    const { data } = await axios.post(
      `${API_URL}/sucursales/${_id}`,
      sucursal,
      headers
    );
  
    dispatch({
      type: UPDATE_SUCURSAL,
      payload: data,
    });
  };
  
  export const deleteSucursal = (_id) => async (dispatch) => {
    const headers = {
      "content-type": "application/json",
    };
  
    await axios.delete(`${API_URL}/sucursales/${_id}`, headers);
  
    dispatch({
      type: DELETE_SUCURSAL,
      payload: _id,
    });
  };
  