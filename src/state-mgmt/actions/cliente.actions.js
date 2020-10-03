import {
  FETCH_CLIENTES,
  CREATE_CLIENTE,
  DELETE_CLIENTE,
} from "../types/cliente.types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchClientes = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/clientes`);

  dispatch({
    type: FETCH_CLIENTES,
    payload: data,
  });
};

export const createCliente = (cliente) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/clientes`, cliente, headers);

  dispatch({
    type: CREATE_CLIENTE,
    payload: data,
  });
};

export const updateCliente = (_id, cliente) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.put(
    `${API_URL}/clientes/${_id}`,
    cliente,
    headers
  );

  dispatch({
    type: UPDATE_CLIENTE,
    payload: data,
  });
};

export const deleteCliente = (_id) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  await axios.delete(`${API_URL}/clientes/${_id}`, headers);

  dispatch({
    type: DELETE_CLIENTE,
    payload: _id,
  });
};
