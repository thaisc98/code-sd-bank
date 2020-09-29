import { API_URL } from "../../utils/constants";
import axios from "axios";
import {
  REGISTRARSE,
  INICIAR_SESION,
  OBTENER_USUARIO_ACTUAL,
  OBTENER_ADMIN,
  CERRAR_SESION,
} from "../types/auth-types";

export const fetchAdminByCedula = (cedula) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.get(
    `${API_URL}/admins/por_cedula/${cedula}`,
    headers
  );

  dispatch({
    type: OBTENER_ADMIN,
    payload: data,
  });
};

export const registrarse = (usuario) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(
    `${API_URL}/auth/signup`,
    { ...usuario },
    headers
  );

  localStorage.setItem(
    "usuarioActual",
    JSON.stringify({
      token: data.token,
      email: data.email,
    })
  );

  localStorage.setItem("admin", JSON.stringify(data.entidad));

  if (!localStorage.getItem("token")) localStorage.setItem("token", data.token);

  dispatch({
    type: REGISTRARSE,
    payload: {
      data,
    },
  });
};

export const iniciarSesion = (usuario) => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.post(`${API_URL}/auth/signin`, {
    ...usuario,
    headers,
  });

  localStorage.setItem(
    "usuarioActual",
    JSON.stringify({
      token: data.token,
      email: data.email,
    })
  );

  localStorage.setItem("admin", JSON.stringify(data.entidad));

  if (!localStorage.getItem("token")) localStorage.setItem("token", data.token);

  dispatch({
    type: INICIAR_SESION,
    payload: data,
  });
};

export const obtenerUsuarioActual = () => async (dispatch) => {
  const headers = {
    "content-type": "application/json",
  };

  const { data } = await axios.get(`${API_URL}/auth/current-user`, headers);

  dispatch({
    type: OBTENER_USUARIO_ACTUAL,
    payload: data,
  });
};

export const cerrarSesion = () => (dispatch) => {
  if (localStorage.getItem("token")) localStorage.removeItem("token");

  if (localStorage.getItem("usuarioActual"))
    localStorage.removeItem("usuarioActual");

  dispatch({
    type: CERRAR_SESION,
    payload: {},
  });
};
