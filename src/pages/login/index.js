/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import * as actionsLogin from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { LoginMain, LoginSection } from './styled';

export default function Login(props) {
  const dispatch = useDispatch();

  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputPasswordType, setInputPasswordType] = useState('password');
  const [loadLogin, setLoadLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');

    if (showFormMsg) {
      hideFormMsg.onclick = () => setshowFormMsg(false);
    }
  }, [showFormMsg]);

  function showPassword() {
    inputPasswordType !== 'text'
      ? setInputPasswordType('text')
      : setInputPasswordType('password');
  }

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
      dispatch(
        actionsLogin.userLoginSuccess({
          user: clearDataUser(data),
          profileUrl: data.profileUrl,
          isLogedIn: true,
        })
      );
    } catch (err) {
      if (get(err, 'response.data', false)) {
        const { data } = err.response;
        data.errors.map((err) => setErrorMessage(err));
        setshowFormMsg(true);
        console.clear();
        return;
      }
      setErrorMessage('Erro desconhecido contate o administrador do sistema.');
      setshowFormMsg(true);
      console.clear();
    } finally {
      setLoadLogin(false);
    }

    return;
  }

  function clearDataUser(data) {
    const session = {
      id: data.session.id,
      expires: new Date(data.session.expires).getTime(),
    };

    return {
      id: data._id,
      nome: data.nome,
      email: data.email,
      session,
    };
  }

  return (
    <LoginMain>
      <Helmet>
        <title>{'MFLIX - Login'}</title>
      </Helmet>
      {loadLogin && <LoadingForm />}
      {showFormMsg && <MessageForm errorMessage={errorMessage} />}
      <LoginSection inputPasswordType={inputPasswordType}>
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
              type={inputPasswordType}
              placeholder="Senha"
              id="password"
              name="password"
              maxLength="9"
            />
            <div className="showPassword" onClick={showPassword}>
              {inputPasswordType !== 'text' ? (
                <svg
                  fill="#2E2D3B"
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  width="100%"
                >
                  <path d="M5.583 17.792q-.583 0-.989-.407-.406-.406-.406-.989V8.521q0-.583.406-.99.406-.406.989-.406h.563V5.167q0-1.605 1.125-2.729Q8.396 1.312 10 1.312q1.625 0 2.74 1.126 1.114 1.124 1.114 2.729v1.958h.563q.583 0 .989.406.406.407.406.99v7.875q0 .583-.406.989-.406.407-.989.407ZM10 13.896q.604 0 1.021-.427.417-.427.417-1.011 0-.604-.428-1.02-.427-.417-1.01-.417-.604 0-1.021.427-.417.427-.417 1.01 0 .604.428 1.021.427.417 1.01.417ZM7.542 7.125h4.916V5.167q0-1.021-.718-1.74-.719-.719-1.74-.719t-1.74.719q-.718.719-.718 1.74Z" />
                </svg>
              ) : (
                <svg
                  fill="#2E2D3B"
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  width="100%"
                >
                  <path d="M5.583 7.125h6.875V5.167q0-1.021-.718-1.74-.719-.719-1.74-.719t-1.74.719q-.718.719-.718 1.74H6.146q0-1.625 1.125-2.74Q8.396 1.312 10 1.312q1.625 0 2.74 1.126 1.114 1.124 1.114 2.729v1.958h.563q.583 0 .989.406.406.407.406.99v7.875q0 .583-.406.989-.406.407-.989.407H5.583q-.583 0-.989-.407-.406-.406-.406-.989V8.521q0-.583.406-.99.406-.406.989-.406ZM10 13.896q.604 0 1.021-.427.417-.427.417-1.011 0-.604-.428-1.02-.427-.417-1.01-.417-.604 0-1.021.427-.417.427-.417 1.01 0 .604.428 1.021.427.417 1.01.417Z" />
                </svg>
              )}
            </div>
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
