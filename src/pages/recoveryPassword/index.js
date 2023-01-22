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
import ShowPassword from '../../components/showPassword';
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

  async function setRecoveryPasswordSubmit(event) {
    event.preventDefault();
    if (showFormMsg) return;

    const inputPassword = event.target.querySelector('#password').value.trim();
    const inputRepeatPassword = event.target
      .querySelector('#repeatPassword')
      .value.trim();

    if (inputPassword.length < 3 || inputPassword.length > 9) {
      setErrorMessage('Senha deve ter entre 3 e 9 caracteres.');
      setshowFormMsg(true);
      return;
    }

    if (inputRepeatPassword !== inputPassword) {
      setErrorMessage('As senhas não coincidem.');
      setshowFormMsg(true);
      return;
    }

    try {
      seLoadRecoveryPassword(true);
      const { data } = await axiosBaseUrlUser.put(
        `/recuperar-senha/${userId}`,
        {
          password: inputPassword,
          RepetPassword: inputRepeatPassword,
        }
      );
      setSuccessMessage(data.recuperarSenha);
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
      seLoadRecoveryPassword(false);
    }
  }

  function setShowPassword() {
    inputPasswordType !== 'text'
      ? setInputPasswordType('text')
      : setInputPasswordType('password');
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
          onClose={setshowFormMsg}
          recoveryPassword
        />
      )}
      <RecoveryPassworSection>
        <h1>MFILX</h1>
        <div>
          <h1>Criar senha</h1>
          <form onSubmit={setRecoveryPasswordSubmit}>
            <div className="input-and-show-password">
              <input
                type={inputPasswordType}
                placeholder="Nova senha"
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
