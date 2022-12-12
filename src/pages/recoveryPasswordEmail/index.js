/* eslint-disable */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { isEmail } from 'validator/validator';
import { get } from 'lodash';
import { useMediaQuery } from 'react-responsive';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import { RecoveryPassworSection } from './styled';

export default function RecoveryPassworEmail() {
  const dispatch = useDispatch();

  const breakPoint290 = useMediaQuery({ maxWidth: 290 });

  const [loadRecoveryPasswordEmail, setLoadRecoveryPasswordEmail] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showFormMsg, setshowFormMsg] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  async function setRecoveryPasswordSubmit(event) {
    event.preventDefault();
    if (showFormMsg) return;

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
      setLoadRecoveryPasswordEmail(false);
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
          onClose={setshowFormMsg}
        />
      )}
      <RecoveryPassworSection>
        <h1>MFILX</h1>
        <div>
          <h1>Insira seu email</h1>
          <form onSubmit={setRecoveryPasswordSubmit}>
            {!breakPoint290 ? (
              <div className="relative-input">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                />
                <button type="submit">Enviar</button>
              </div>
            ) : (
              <div className="mobile-relative-input">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                />
                <button type="submit">Enviar</button>
              </div>
            )}
          </form>
        </div>
      </RecoveryPassworSection>
    </>
  );
}
