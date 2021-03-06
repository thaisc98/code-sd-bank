import {
  FETCH_PERFILES,
  CREATE_PERFIL,
  DELETE_PERFIL,
  UPDATE_PERFIL,
  FETCH_PERFIL,
} from "../types/perfil.types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchPerfiles = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/perfiles`);

  dispatch({
    type: FETCH_PERFILES,
    payload: data,
  });
};

export const getPerfilById = (_id) => async (dispatch) => {
  console.log("id", _id);
  const { data } = await axios.get(`${API_URL}/perfiles/${_id}`);

  dispatch({
    type: FETCH_PERFIL,
    payload: data,
  });
};

export const createPerfil = (perfil) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/perfiles`, perfil, headers);

  dispatch({
    type: CREATE_PERFIL,
    payload: data,
  });
};

export const updatePerfil = (_id, perfil) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.put(
    `${API_URL}/perfiles/${_id}`,
    perfil,
    headers
  );

  dispatch({
    type: UPDATE_PERFIL,
    payload: data,
  });
};

export const deletePerfil = (_id) => async (dispatch) => {
  await axios.delete(`${API_URL}/perfiles/${_id}`);

  dispatch({
    type: DELETE_PERFIL,
    payload: _id,
  });
};
