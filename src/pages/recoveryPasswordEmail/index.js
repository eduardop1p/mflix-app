/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { isEmail } from 'validator/validator';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import { RecoveryPassworSection } from './styled';

export default function RecoveryPassworEmail() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  function setRecoveryPasswordSubmit(event) {
    event.preventDefault();
    event.target.querySelectorAll('small').forEach((small) => small.remove());
    const inputEmail = event.target.querySelector('#email');
    let inputValid = true;

    if (!isEmail(inputEmail.value)) {
      const small = document.createElement('small');
      small.innerText = 'E-mail inválido.';
      event.target.querySelector('.relative-input').before(small);
      inputValid = false;
    }

    if (!inputValid) return;

    return;
  }

  return (
    <>
      <Helmet>
        <title>MFLIX - Recuperar senha</title>
      </Helmet>
      <RecoveryPassworSection>
        <h1>MFILX</h1>
        <div>
          <h1>Insira seu email</h1>
          <form onSubmit={setRecoveryPasswordSubmit}>
            <div className="relative-input">
              <input type="text" id="email" placeholder="Email" />
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </RecoveryPassworSection>
    </>
  );
}
