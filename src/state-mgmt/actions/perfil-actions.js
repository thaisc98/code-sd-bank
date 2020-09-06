import {
  FETCH_PERFILES,
  FETCH_PERFIL,
  CREATE_PERFIL,
  DELETE_PERFIL,
} from "../types/perfil-types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchPerfiles = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/perfil`);

  dispatch({
    type: FETCH_PERFILES,
    payload: data,
  });
};

export const fetchPerfil = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/perfil/${_id}`);

  dispatch({
    type: FETCH_PERFIL,
    payload: data,
  });
};

export const createPerfil = (perfil) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/perfil`, perfil, headers);

  dispatch({
    type: CREATE_PERFIL,
    payload: data,
  });
};
