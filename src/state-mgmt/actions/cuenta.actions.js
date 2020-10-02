import {
  FETCH_CUENTAS,
  FETCH_CUENTA,
  CREATE_CUENTA,
} from "../types/cuenta.types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchCuentas = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/cuentas`);

  dispatch({
    type: FETCH_CUENTAS,
    payload: data,
  });
};

export const fetchCuentaById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/cuentas/${_id}`);

  dispatch({
    type: FETCH_CUENTA,
    payload: data,
  });
};

export const createCuenta = (cuenta) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/cuentas`, cuenta, headers);

  dispatch({
    type: CREATE_CUENTA,
    payload: data,
  });
};
