import axios from "axios";
import { API_URL } from "../../utils/constants";
import { GET_PERFILES, GET_PERFIL } from "../types/perfil-types";

export const getPerfiles = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/perfiles`);

  dispatch({
    type: GET_PERFILES,
    payload: data,
  });
};

export const getPefil = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/perfiles/${_id}`);

  dispatch({
    type: GET_PERFIL,
    payload: data,
  });
};

