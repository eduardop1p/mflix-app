import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail, isAlphanumeric } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

/* eslint-disable */

import * as actions from '../../storeReactRedux/modules/loading/actions';
import * as actionsLogin from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import ShowPassword from '../../components/showPassword';

import clearDataUser, {
  clearDataUserSession,
} from '../../config/clearDataUserConfig';
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

  function setShowPassword() {
    inputPasswordType !== 'text'
      ? setInputPasswordType('text')
      : setInputPasswordType('password');
  }

  async function haldleValidaInput(event) {
    event.preventDefault();
    if (showFormMsg) return;

    const inputNome = event.target.querySelector('input#nome').value.trim();
    const inputEmail = event.target.querySelector('input#email').value.trim();
    const inputPassword = event.target
      .querySelector('input#password')
      .value.trim();
    const inputPasswordRepetir = event.target
      .querySelector('input#password-repetir')
      .value.trim();

    if (inputNome.length < 3 || inputNome.length > 8) {
      setErrorMessage('Usuário deve ter entre 3 e 8 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (!isAlphanumeric(inputNome)) {
      setErrorMessage('Usuário deve conter apenas letras e números.');
      setshowFormMsg(true);
      return;
    }
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
    if (inputPasswordRepetir !== inputPassword) {
      setErrorMessage('As senhas não coincidem.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadConta(true);
      await axiosUserBaseUrl.post('/users', {
        nome: inputNome,
        email: inputEmail,
        password: inputPassword,
        RepetPassword: inputPasswordRepetir,
      });
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
      setSuccessMessage('Conta criada com sucesso!');
      setshowFormMsg(true);
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
      setLoadConta(false);
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
          onClose={setshowFormMsg}
          account
        />
      )}
      <h1>MFILX</h1>
      <div className="conta">
        <h1>Criar conta</h1>
        <form onSubmit={haldleValidaInput}>
          <div className="container-input">
            <div className="container-1">
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
            <div className="container-2 ">
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
