/* eslint-disable */

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { capitalize } from 'lodash';

import * as actionsLoading from '../../storeReactRedux/modules/loading/actions';
import * as actionsAuth from '../../storeReactRedux/modules/auth/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import profileNotPhoto from '../../assets/images/profile-not-photo.jpg';
import profilePath from '../../assets/images/171045158_354469046006037_4005434614416819506_n[3].jpg';
import { Main, ProfilePhoto } from './styled';

export default function User() {
  const dispatch = useDispatch();
  const user = useRef(useSelector((state) => state.auth.user));
  const loadingState = useSelector((state) => state.loading.loadingState);

  const [profileLoad, setProfileLoad] = useState(false);
  const [loadLogout, setLoadLogout] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (profileLoad && loadingState)
      setTimeout(() => dispatch(actionsLoading.loadingFailure()), 500);
  }, [dispatch, profileLoad, loadingState]);

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (hideFormMsg)
      hideFormMsg.addEventListener('click', () => setshowFormMsg(false));
  });

  async function logoutUser() {
    setErrorMessage('');

    try {
      setLoadLogout(true);
      await axiosBaseUrlUser.get('logout', {
        headers: { Authorization: user.current.session.id },
      });
      setLoadLogout(false);
      dispatch(actionsAuth.userLoginFailure());
      window.location.href = '/';
    } catch (err) {
      setLoadLogout(false);
      setshowFormMsg(true);
      setErrorMessage('Erro ao fazer logout.');
      console.clear();
    }
  }

  return (
    <>
      <Helmet>
        <title>MFLIX - {capitalize(user.current.nome)}</title>
      </Helmet>
      {loadLogout && <LoadingForm />}
      {showFormMsg && <MessageForm errorMessage={errorMessage} />}
      <Main>
        <ProfilePhoto>
          <img
            onLoad={() => setProfileLoad(true)}
            onError={() => setProfileLoad(true)}
            src={profilePath}
            alt={user.current.nome}
          />
        </ProfilePhoto>
        <div className="profile-details">
          <h1>{capitalize(user.current.nome)}</h1>
          <div className="edit-logout">
            <button className="edit" type="button">
              Editar perfil
            </button>
            <button className="logout" type="button" onClick={logoutUser}>
              Sair
            </button>
          </div>
        </div>
      </Main>
    </>
  );
}
