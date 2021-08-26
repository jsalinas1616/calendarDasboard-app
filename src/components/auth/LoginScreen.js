import React from 'react';
import { useForm } from '../../hooks/useForm';
import './login.css';
import { useDispatch } from 'react-redux';
import { startLogin, authStartRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: 'test@odintec.com.mx',
    lPassword: 'RedCod25',
  });

  const { lEmail, lPassword } = formLoginValues;

  const [formRegisterValues, handleRegisterValues] = useForm({
    rName: 'Nando',
    rEmail: 'nando@prodigy.net',
    rPassword: '123456',
    rPasswordValidation: '123456',
  });

  const { rName, rEmail, rPassword, rPasswordValidation } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(lEmail, lPassword));
  };

  const handleregister = (e) => {
    e.preventDefault();

    if (rPassword !== rPasswordValidation) {
      return Swal.fire('Error', 'Las contraseñas no son iguales');
    }

    dispatch(authStartRegister(rName, rEmail, rPassword, rPasswordValidation));
  };

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='lPassword'
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={handleregister}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='rName'
                value={rName}
                onChange={handleRegisterValues}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='rEmail'
                value={rEmail}
                onChange={handleRegisterValues}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='rPassword'
                value={rPassword}
                onChange={handleRegisterValues}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='rPasswordValidation'
                value={rPasswordValidation}
                onChange={handleRegisterValues}
              />
            </div>

            <div className='form-group'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
