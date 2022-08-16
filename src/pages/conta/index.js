import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

/* eslint-disable */

import * as actions from '../../storeReactRedux/modules/loading/actions';
import * as actionsLogin from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { ContaSection } from './styled';

export default function Conta() {
  const dispatch = useDispatch();

  const [inputEmailValue, setInputEmailValue] = useState('');
  const [loadConta, setLoadConta] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (hideFormMsg)
      hideFormMsg.addEventListener('click', () => {
        setshowFormMsg(false);
        if (successMessage) {
          setTimeout(() => (window.location.href = '/'), 50);
          return;
        }
      });
  });

  async function haldleValidaInput(event) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const inputNome = event.target.querySelector('input#nome');
    const inputEmail = event.target.querySelector('input#email');
    const inputPassword = event.target.querySelector('input#password');
    const inputPasswordRepetir = event.target.querySelector(
      'input#password-repetir'
    );

    if (inputNome.value.length < 3 || inputNome.value.length > 8) {
      setErrorMessage('Usuário deve ter entre 3 e 8 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (!isEmail(inputEmail.value)) {
      setErrorMessage('E-mail inválido.');
      setshowFormMsg(true);
      return;
    }
    if (inputPassword.value.length < 3 || inputPassword.value.length > 9) {
      setErrorMessage('Senha deve ter entre 3 e 9 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (inputPasswordRepetir.value !== inputPassword.value) {
      setErrorMessage('As senhas não coincidem.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadConta(true);
      await axiosUserBaseUrl.post('/users', {
        nome: inputNome.value,
        email: inputEmail.value,
        password: inputPassword.value,
        RepetPassword: inputPasswordRepetir.value,
      });
      const { data } = await axiosUserBaseUrl.post('/login', {
        email: inputEmail.value,
        password: inputPassword.value,
      });
      setLoadConta(false);
      dispatch(actionsLogin.userLoginSuccess({ user: data, isLogedIn: true }));
      setSuccessMessage('Conta criada com sucesso!');
      setshowFormMsg(true);
    } catch (err) {
      setLoadConta(false);
      const { data } = err.response;
      data.errors.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    }
  }

  return (
    <ContaSection>
      <Helmet>
        <title>{'MFLIX - Conta'}</title>
      </Helmet>
      {loadConta && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <h1>MFILX</h1>
      <div className="conta">
        <h1>Criar conta</h1>
        <form onSubmit={haldleValidaInput}>
          <div className="container-input">
            <div className="container-1 input">
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
            </div>
            <div className="container-2 input">
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
            </div>
          </div>
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
  );
}
