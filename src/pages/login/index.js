/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import * as actionsLogin from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { LoginMain, LoginSection } from './styled';

export default function Login(props) {
  const dispatch = useDispatch();

  const [inputEmailValue, setInputEmailValue] = useState('');
  const [loadLogin, setLoadLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (hideFormMsg)
      hideFormMsg.addEventListener('click', () => setshowFormMsg(false));
  });

  async function haldleValidaInput(event) {
    event.preventDefault();
    setErrorMessage('');
    const inputEmail = event.target.querySelector('input#email');
    const inputPassword = event.target.querySelector('input#password');

    // login as respostas vem do back end

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

    try {
      setLoadLogin(true);
      const { data } = await axiosUserBaseUrl.post('/login', {
        email: inputEmail.value,
        password: inputPassword.value,
      });
      setLoadLogin(false);
      dispatch(actionsLogin.userLoginSuccess({ user: data, isLogedIn: true }));
    } catch (err) {
      setLoadLogin(false);
      const { data } = err.response;
      data.errors.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    }

    return;
  }

  return (
    <LoginMain>
      <Helmet>
        <title>{'MFLIX - Login'}</title>
      </Helmet>
      {loadLogin && <LoadingForm />}
      {showFormMsg && <MessageForm errorMessage={errorMessage} />}
      <LoginSection>
        <h1>MFILX</h1>
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={haldleValidaInput}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              id="email"
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
            <button className="submit-login" type="submit">
              Login
            </button>
          </form>
          <div className="sing-up-recover-password">
            <Link reloadDocument to="/criar-conta">
              Criar conta.
            </Link>
            <Link reloadDocument to="/recuperar-senha">
              Recuperar senha.
            </Link>
          </div>
        </div>
      </LoginSection>
    </LoginMain>
  );
}
