/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator/validator';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import * as actions from '../../storeReactRedux/modules/loading/actions';
import * as actionsLogin from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingFilters from '../../components/loadingFilters/index';
import { LoginSection } from './styled';

export default function Login() {
  const dispatch = useDispatch();

  const [inputEmailValue, setInputEmailValue] = useState('');
  const [loadLogin, setLoadLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => dispatch(actions.loadingFailure()), 500);
  }, []);

  async function haldleValidaInput(event) {
    event.preventDefault();
    event.target.querySelectorAll('small').forEach((small) => small.remove());
    const inputEmail = event.target.querySelector('input#email');
    const inputPassword = event.target.querySelector('input#password');
    let inputValid = true;

    // login as respostas vem do back end

    if (!isEmail(inputEmail.value)) {
      const small = document.createElement('small');
      small.innerText = 'E-mail inválido.';
      inputEmail.before(small);
      inputValid = false;
    }

    if (!inputValid) return;

    try {
      setLoadLogin(true);
      const { data } = await axiosUserBaseUrl.post('/login', {
        email: inputEmail.value,
        password: inputPassword.value,
      });
      dispatch(actionsLogin.userLoginSuccess({ user: data, isLogedIn: true }));
      window.location.href = '/';
      setTimeout(() => setLoadLogin(false), 100);
    } catch (err) {
      setTimeout(() => setLoadLogin(false), 100);
      console.error(err);
    }

    return;
  }

  return (
    <>
      <Helmet>
        <title>{'MFLIX - Login'}</title>
      </Helmet>
      {loadLogin && <LoadingFilters />}
      <LoginSection>
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
              type="password"
              placeholder="Senha"
              id="password"
              name="password"
              maxLength="9"
            />
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
    </>
  );
}
