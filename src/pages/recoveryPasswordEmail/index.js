/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { isEmail } from 'validator/validator';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { RecoveryPassworSection } from './styled';

export default function RecoveryPassworEmail() {
  const dispatch = useDispatch();

  const [loadRecoveryPasswordEmail, setLoadRecoveryPasswordEmail] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (hideFormMsg)
      hideFormMsg.addEventListener('click', () => setshowFormMsg(false));
  });

  async function setRecoveryPasswordSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const inputEmail = event.target.querySelector('#email');

    if (!isEmail(inputEmail.value)) {
      setErrorMessage('E-mail inválido.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadRecoveryPasswordEmail(true);
      const { data } = await axiosBaseUrlUser.post('/recuperar-senha', {
        email: inputEmail.value,
      });
      setLoadRecoveryPasswordEmail(false);
      setSuccessMessage(data.recuperarSenha);
      setshowFormMsg(true);
    } catch (err) {
      setLoadRecoveryPasswordEmail(false);
      const { data } = err.response;
      data.errors.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    }
  }

  return (
    <>
      <Helmet>
        <title>MFLIX - Recuperar senha</title>
      </Helmet>
      {loadRecoveryPasswordEmail && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <RecoveryPassworSection>
        <h1>MFILX</h1>
        <div>
          <h1>Insira seu email</h1>
          <form onSubmit={setRecoveryPasswordSubmit}>
            <div className="relative-input">
              <input type="text" id="email" placeholder="Email" name="email" />
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </RecoveryPassworSection>
    </>
  );
}
