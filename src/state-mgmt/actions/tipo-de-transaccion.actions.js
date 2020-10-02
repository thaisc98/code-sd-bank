import {
  FETCH_TIPO_DE_TRANSACCIONES,
  FETCH_TIPO_DE_TRANSACCION,
  CREATE_TIPO_DE_TRANSACCION,
  UPDATE_TIPO_DE_TRANSACCION,
  DELETE_TIPO_DE_TRANSACCION,
} from "../types/tipo-de-transacciones.types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchTiposDeTransacciones = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/tipo-de-transaccion`);

  dispatch({
    type: FETCH_TIPO_DE_TRANSACCIONES,
    payload: data,
  });
};

export const fetchTipoDeTransaccionById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/tipo-de-transaccion/${_id}`);

  dispatch({
    type: FETCH_TIPO_DE_TRANSACCION,
    payload: data,
  });
};

export const createTipoDeTransaccion = (transaccion) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/tipo-de-transaccion`,
    transaccion,
    headers
  );

  dispatch({
    type: CREATE_TIPO_DE_TRANSACCION,
    payload: data,
  });
};

export const updateTipoDeTransaccion = (_id, transaccion) => async (
  dispatch
) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.put(
    `${API_URL}/tipo-de-transaccion/${_id}`,
    transaccion,
    headers
  );

  dispatch({
    type: UPDATE_TIPO_DE_TRANSACCION,
    payload: data,
  });
};

export const deleteTipoDeTransaccion = (_id) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  await axios.delete(`${API_URL}/tipo-de-transaccion/${_id}`, headers);

  dispatch({
    type: DELETE_TIPO_DE_TRANSACCION,
    payload: _id,
  });
};
