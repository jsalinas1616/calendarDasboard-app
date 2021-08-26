import Swal from 'sweetalert2';
import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLogout } from './events';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST');
    const body = await resp.json();
    try {
      if (body.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      } else {
        return Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const authStartRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/adduser',
      {
        name,
        email,
        password,
      },
      'POST'
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  };
};

export const logout = () => ({ type: types.authLogout });
