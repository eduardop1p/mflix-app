/* eslint-disable */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { RecoveryPassworSection } from './styled';

export default function RecoveryPasswordEmail() {
  const { userId } = useParams();
  const dispatch = useDispatch();

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
        window.location.href = `/recuperar-senha/${userId}/bad`;
      }
      return;
    };
    userExist(userId);
  }, []);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (hideFormMsg)
      hideFormMsg.addEventListener('click', () => {
        setshowFormMsg(false);
        if (successMessage) {
          window.location.href = '/login';
          return;
        }
      });
  });

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
      seLoadRecoveryPassword(false);
      setSuccessMessage(data.recuperarSenha);
      setshowFormMsg(true);
    } catch (err) {
      seLoadRecoveryPassword(false);
      const { data } = err.response;
      data.errors.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
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
              type="password"
              placeholder="Nova senha"
              id="password"
              name="password"
              maxLength="9"
            />
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
