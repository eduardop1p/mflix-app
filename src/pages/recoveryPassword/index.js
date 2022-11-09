/* eslint-disable */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { get } from 'lodash';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { RecoveryPassworSection } from './styled';

export default function RecoveryPasswordEmail() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [inputPasswordType, setInputPasswordType] = useState('password');
  const [loadRecoveryPassword, seLoadRecoveryPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    const userExist = async (userId) => {
      try {
        await axiosBaseUrlUser.get(`/recuperar-senha/${userId}`);
        setTimeout(() => dispatch(actions.loadingFailure()), 500);
      } catch {
        window.location.href = `/recuperar-senha/${userId}/404`;
      }
      return;
    };
    userExist(userId);
  }, []);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (showFormMsg) {
      hideFormMsg.addEventListener('click', () => {
        setshowFormMsg(false);
        if (successMessage) {
          window.location.href = '/login';
          return;
        }
      });
    }
  }, [showFormMsg]);

  function showPassword() {
    inputPasswordType !== 'text'
      ? setInputPasswordType('text')
      : setInputPasswordType('password');
  }

  async function setRecoveryPasswordSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const inputPassword = event.target.querySelector('#password');
    const inputRepeatPassword = event.target.querySelector('#repeatPassword');

    if (inputPassword.value.length < 3 || inputPassword.value.length > 9) {
      setErrorMessage('Senha deve ter entre 3 e 9 caracteres.');
      setshowFormMsg(true);
      return;
    }

    if (inputRepeatPassword.value !== inputPassword.value) {
      setErrorMessage('As senhas não coincidem.');
      setshowFormMsg(true);
      return;
    }

    try {
      seLoadRecoveryPassword(true);
      const { data } = await axiosBaseUrlUser.put(
        `/recuperar-senha/${userId}`,
        {
          password: inputPassword.value,
          RepetPassword: inputRepeatPassword.value,
        }
      );
      setSuccessMessage(data.recuperarSenha);
      setshowFormMsg(true);
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
      seLoadRecoveryPassword(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>MFLIX - Criar nova senha</title>
      </Helmet>
      {loadRecoveryPassword && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <RecoveryPassworSection>
        <h1>MFILX</h1>
        <div>
          <h1>Criar senha</h1>
          <form onSubmit={setRecoveryPasswordSubmit}>
            <input
              type={inputPasswordType}
              placeholder="Nova senha"
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
              placeholder="Repetir nova senha"
              id="repeatPassword"
              name="repeatPassword"
              maxLength="9"
            />

            <button type="submit">Criar</button>
          </form>
        </div>
      </RecoveryPassworSection>
    </>
  );
}
