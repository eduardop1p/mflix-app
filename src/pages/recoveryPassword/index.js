/* eslint-disable */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import isObjectId from 'bson-objectid';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import { RecoveryPassworSection } from './styled';

export default function RecoveryPasswordEmail() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isObjectId.isValid(userId))
      return (window.location.href = `/recuperar-senha/${userId}/bad`);
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  function setRecoveryPasswordSubmit(event) {
    event.preventDefault();
    event.target.querySelectorAll('small').forEach((small) => small.remove());
    const inputPassword = event.target.querySelector('#password');
    const inputRepeatPassword = event.target.querySelector('#repeatPassword');
    let inputValid = true;

    if (inputRepeatPassword.value !== inputPassword.value) {
      const small = document.createElement('small');
      small.innerText = 'As senhas não coincidem.';
      inputPassword.before(small);
      inputValid = false;
    }
    if (!inputValid) return;
    // event.target.submit();

    return (window.location.href = '/login');
  }

  return (
    <>
      <Helmet>
        <title>MFLIX - Criar nova senha</title>
      </Helmet>
      <RecoveryPassworSection>
        <h1>MFILX</h1>
        <div>
          <h1>Criar senha</h1>
          <form onSubmit={setRecoveryPasswordSubmit}>
            <input
              type="text"
              placeholder="Nova senha"
              id="password"
              maxLength="9"
            />
            <input
              type="text"
              placeholder="Repetir nova senha"
              id="repeatPassword"
              maxLength="9"
            />

            <button type="submit">Criar</button>
          </form>
        </div>
      </RecoveryPassworSection>
    </>
  );
}
