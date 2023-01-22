/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isEmail } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import * as actionsLogin from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import ShowPassword from '../../components/showPassword';
import clearDataUser, {
  clearDataUserSession,
} from '../../config/clearDataUserConfig';
import { LoginMain, LoginSection } from './styled';

export default function Login(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputPasswordType, setInputPasswordType] = useState('password');
  const [loadLogin, setLoadLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [expires, setExpires] = useState(false);

  useEffect(() => {
    getSessionExpires();
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  function setShowPassword() {
    inputPasswordType !== 'text'
      ? setInputPasswordType('text')
      : setInputPasswordType('password');
  }

  async function haldleValidaInput(event) {
    event.preventDefault();
    if (showFormMsg) return;

    const inputEmail = event.target.querySelector('input#email').value.trim();
    const inputPassword = event.target
      .querySelector('input#password')
      .value.trim();

    // login as respostas vem do back-end

    if (!isEmail(inputEmail)) {
      setErrorMessage('E-mail inválido.');
      setshowFormMsg(true);
      return;
    }
    if (inputPassword.length < 3 || inputPassword.length > 9) {
      setErrorMessage('Senha deve ter entre 3 e 9 caracteres.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadLogin(true);
      const { data } = await axiosUserBaseUrl.post('/login', {
        email: inputEmail,
        password: inputPassword,
      });
      dispatch(
        actionsLogin.userLoginSuccess({
          user: clearDataUser(data),
          session: clearDataUserSession(data),
          isLogedIn: true,
        })
      );
    } catch (err) {
      if (get(err, 'response.data', false)) {
        const { data } = err.response;
        data.errors.map((err) => setErrorMessage(err));
        setshowFormMsg(true);
        return;
      }
      setErrorMessage('Erro no servidor.');
      setshowFormMsg(true);
    } finally {
      setLoadLogin(false);
    }

    return;
  }

  function getSessionExpires() {
    const search = location.search;
    const sessionExpires = new URLSearchParams(search).get('session_expires');
    sessionExpires && setExpires(sessionExpires);
  }

  return (
    <LoginMain>
      <Helmet>
        <title>{'MFLIX - Login'}</title>
      </Helmet>
      {loadLogin && <LoadingForm />}
      {showFormMsg && (
        <MessageForm errorMessage={errorMessage} onClose={setshowFormMsg} />
      )}
      <LoginSection inputPasswordType={inputPasswordType} expires={expires}>
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
            <div className="input-and-show-password">
              <input
                type={inputPasswordType}
                placeholder="Senha"
                id="password"
                name="password"
                maxLength="9"
              />

              <ShowPassword
                inputPasswordType={inputPasswordType}
                setShowPassword={setShowPassword}
              />
            </div>

            <button className="submit-login" type="submit">
              Login
            </button>
          </form>
          <div className="sing-up-recover-password">
            <div>
              <Link reloadDocument to="/criar-conta">
                Criar conta.
              </Link>
              <Link reloadDocument to="/recuperar-senha">
                Recuperar senha.
              </Link>
            </div>
            {expires && (
              <small>Sua sessão expirou faça login novalmente*</small>
            )}
          </div>
        </div>
      </LoginSection>
    </LoginMain>
  );
}
