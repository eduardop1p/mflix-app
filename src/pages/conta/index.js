import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import { ContaSection } from './styled';

/* eslint-disable */
export default function Conta() {
  const dispatch = useDispatch();

  const [inputEmailValue, setInputEmailValue] = useState('');

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  async function haldleValidaInput(event) {
    event.preventDefault();
    event.target.querySelectorAll('small').forEach((small) => small.remove());
    const inputNome = event.target.querySelector('input#nome');
    const inputEmail = event.target.querySelector('input#email');
    const inputPassword = event.target.querySelector('input#password');
    const inputPasswordRepetir = event.target.querySelector(
      'input#password-repetir'
    );
    let inputValid = true;

    if (inputNome.value.length < 3 || inputNome.value.length > 8) {
      const small = document.createElement('small');
      small.innerText = 'Usuário deve ter entre 3 e 8 caracteres.';
      inputNome.before(small);
      inputValid = false;
    }
    if (!isEmail(inputEmail.value)) {
      const small = document.createElement('small');
      small.innerText = 'E-mail inválido.';
      inputEmail.before(small);
      inputValid = false;
    }
    if (inputPassword.value.length < 3 || inputPassword.value.length > 9) {
      const small = document.createElement('small');
      small.innerText = 'Senha deve ter entre 3 e 9 caracteres.';
      inputPassword.before(small);
      inputValid = false;
    }
    if (inputPasswordRepetir.value !== inputPassword.value) {
      const small = document.createElement('small');
      small.innerText = 'As senhas não coincidem.';
      inputPasswordRepetir.before(small);
      inputValid = false;
    }

    if (!inputValid) return;

    try {
      const { data } = await axiosUserBaseUrl.post('/users', {
        nome: inputNome.value,
        email: inputEmail.value,
        password: inputPassword.value,
        RepetPassword: inputPasswordRepetir.value,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    // return (window.location.href = '/');
  }

  return (
    <>
      <Helmet>
        <title>{'MFLIX - Conta'}</title>
      </Helmet>
      <ContaSection>
        <h1>MFILX</h1>
        <div className="conta">
          <h1>Criar conta</h1>
          <form onSubmit={haldleValidaInput}>
            <input
              type="text"
              placeholder="Usuário"
              id="nome"
              name="nome"
              maxLength="8"
            />
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              value={inputEmailValue}
              onChange={(event) => setInputEmailValue(event.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              id="password"
              name="password"
              maxLength="9"
            />
            <input
              type="password"
              placeholder="Repetir senha"
              id="password-repetir"
              name="RepetPassword"
              maxLength="9"
            />
            <button className="submit-conta" type="submit">
              Criar
            </button>
          </form>
          <div className="sing-up-recover-password">
            <Link reloadDocument to="/login">
              Fazer login.
            </Link>
            <small>*Todos os campos são obrigatórios*</small>
          </div>
        </div>
      </ContaSection>
    </>
  );
}
