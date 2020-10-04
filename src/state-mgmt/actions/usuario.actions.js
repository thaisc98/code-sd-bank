import {
  FETCH_USUARIOS,
  FETCH_USUARIO,
  FETCH_ENTIDAD_BY_USUARIO_ID,
  CREATE_USUARIO,
  FETCH_ENTIDADES_BY_PERFIL,
  UPDATE_USUARIO,
  DELETE_USUARIO,
  CERRAR_DETALLES,
} from "../types/usuario.types";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchUsuarios = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/usuarios`);

  dispatch({
    type: FETCH_USUARIOS,
    payload: data,
  });
};

export const fetchEntidadesByPerfil = (_id) => async (dispatch) => {
  const { data } = await axios.get(
    `${API_URL}/usuarios/perfil/${_id}/entidades_asociadas`
  );

  dispatch({
    type: FETCH_ENTIDADES_BY_PERFIL,
    payload: data,
  });
};

export const fetchUsuarioById = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/usuarios/${_id}`);

  dispatch({
    type: FETCH_USUARIO,
    payload: data,
  });
};

export const fetchEntidadByUsuarioId = (_id) => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/usuarios/${_id}/entidad`);

  dispatch({
    type: FETCH_ENTIDAD_BY_USUARIO_ID,
    payload: data,
  });
};

export const createUsuario = (usuario) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/usuarios`, usuario, headers);

  dispatch({
    type: CREATE_USUARIO,
    payload: data,
  });
};

export const updateUsuario = (_id, usuario) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/usuarios/${_id}`,
    usuario,
    headers
  );

  dispatch({
    type: UPDATE_USUARIO,
    payload: data,
  });
};

export const cerrarDetalles = () => (dispatch) => {
  dispatch({
    type: CERRAR_DETALLES,
    payload: {
      usuario: null,
      entidadAsociada: null,
    },
  });
};

export const deleteUsuario = (_id, tipo_entidad_asociada) => async (
  dispatch
) => {
  const headers = {
    "content-type": "application/json",
  };

  await axios.delete(`${API_URL}/usuarios/${_id}`, {
    headers: { ...headers },
    params: {
      tipo_entidad_asociada,
    },
  });

  dispatch({
    type: DELETE_USUARIO,
    payload: _id,
  });
};
