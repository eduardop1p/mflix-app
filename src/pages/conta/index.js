import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail, isAlphanumeric } from 'validator/validator';
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

  const [inputPasswordType, setInputPasswordType] = useState('password');
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
    if (showFormMsg) {
      hideFormMsg.onclick = () => {
        setshowFormMsg(false);
        if (successMessage) {
          setTimeout(() => (window.location.href = '/'), 50);
          return;
        }
      };
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
    if (!isAlphanumeric(inputNome.value)) {
      setErrorMessage('Usuário deve conter apenas letras e números.');
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
      dispatch(
        actionsLogin.userLoginSuccess({
          user: clearDataUser(data),
          profileUrl: data.profileUrl,
          isLogedIn: true,
        })
      );
      setSuccessMessage('Conta criada com sucesso!');
      setshowFormMsg(true);
    } catch (err) {
      const { data } = err.response;
      data.errors.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    } finally {
      setLoadConta(false);
    }
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
            Fazer&nbsp;login.
          </Link>
          <small>*Todos&nbsp;os&nbsp;campos&nbsp;são&nbsp;obrigatórios*</small>
        </div>
      </div>
    </ContaSection>
  );
}
