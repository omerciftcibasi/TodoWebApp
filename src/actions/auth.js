import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_TOKEN
} from "./types";

import TokenService from "../services/token.service";


export const loginSuccess = (data) =>  (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user: data },
  });
  TokenService.setUser(data);

  return Promise.resolve();

}


export const logout = () => (dispatch) => {
  TokenService.removeUser();
  dispatch({
    type: LOGOUT,
  });
};

export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
  })
}
