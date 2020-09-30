import {
  FETCH_CAJEROS,
  FETCH_CAJERO,
  FETCH_USUARIO_CAJERO,
  FETCH_CAJERO_BY_CEDULA,
  CREATE_CAJERO,
  UPDATE_CAJERO,
  DELETE_CAJERO,
  CREATE_CUENTA_CAJERO,
} from "../types/cajero-types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchCajeros = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/cajeros`);

  dispatch({
    type: FETCH_CAJEROS,
    payload: data,
  });
};

export const fetchCajeroById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/cajeros/${_id}`);

  dispatch({
    type: FETCH_CAJERO,
    payload: data,
  });
};

export const fetchUsuarioCajero = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/cajeros/usuario-cajero/${_id}`);

  dispatch({
    type: FETCH_USUARIO_CAJERO,
    payload: data,
  });
};

export const fetchCajeroByCedula = (cedula) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/cajeros/por_cedula/${cedula}`);

  dispatch({
    type: FETCH_CAJERO_BY_CEDULA,
    payload: data,
  });
};

export const createCajero = (cajero) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/cajeros`, cajero, headers);

  dispatch({
    type: CREATE_CAJERO,
    payload: data,
  });
};

export const crearCuentaCajero = (cajero) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/cajeros/auth/signup`,
    cajero,
    headers
  );

  dispatch({
    type: CREATE_CUENTA_CAJERO,
    payload: data,
  });
};

export const updateCajero = (_id, cajero) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/cajeros/${_id}`,
    cajero,
    headers
  );

  dispatch({
    type: UPDATE_CAJERO,
    payload: data,
  });
};

export const deleteCajero = (_id) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  await axios.delete(`${API_URL}/cajeros/${_id}`, headers);

  dispatch({
    type: DELETE_CAJERO,
    payload: _id,
  });
};
