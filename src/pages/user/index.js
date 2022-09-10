/* eslint-disable */

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { capitalize, get } from 'lodash';

import * as actionsLoading from '../../storeReactRedux/modules/loading/actions';
import * as actionsAuth from '../../storeReactRedux/modules/auth/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import userNotPhoto from '../../assets/images/profile-not-photo.jpg';
import { Main, ProfilePhoto, NewUpdateDeletePhotoDiv } from './styled';

export default function User() {
  const dispatch = useDispatch();
  const user = useRef(useSelector((state) => state.auth.user));
  const profileUrl = useRef(useSelector((state) => state.auth.profileUrl));
  const loadingApp = useSelector((state) => state.loading.loadingState);

  const [showNewUpdateDeletePhoto, setShowNewUpdateDelete] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadUserPhoto, setLoadUserPhoto] = useState(false);

  useEffect(() => {
    if (loadUserPhoto && loadingApp)
      setTimeout(() => dispatch(actionsLoading.loadingFailure()), 500);
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (hideFormMsg)
      hideFormMsg.addEventListener('click', () => setshowFormMsg(false));
  });

  async function uploadUserPhoto(event) {
    setSuccessMessage('');
    setErrorMessage('');
    setShowNewUpdateDelete(false);

    const file = event.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append('user-foto', file);
    const userFoto = document.body.querySelector('#user-foto');
    try {
      setLoadUser(true);
      const { data } = await axiosBaseUrlUser.post(
        `/fotos/${user.current.id}`,
        formDataFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setLoadUser(false);
      userFoto.src = data.foto.url;
      dispatch(
        actionsAuth.userLoginPhotoSuccess({ profileUrl: data.foto.url })
      );
      setSuccessMessage('Foto de perfil alterada.');
      setshowFormMsg(true);
    } catch (err) {
      setLoadUser(false);
      const { data } = err.response;
      data.error.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    }
  }

  async function deleteUserPhoto() {
    setSuccessMessage('');
    setErrorMessage('');
    setShowNewUpdateDelete(false);

    const userFoto = document.body.querySelector('#user-foto');

    try {
      setLoadUser(true);
      await axiosBaseUrlUser.delete(`/fotos/${user.current.id}`);
      setLoadUser(false);
      userFoto.src = userNotPhoto;
      setSuccessMessage('Foto de perfil deletada.');
      dispatch(actionsAuth.userLoginPhotoFailure());
      setshowFormMsg(true);
    } catch (err) {
      setLoadUser(false);
      const { data } = err.response;
      data.error.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    }
  }

  async function logoutUser() {
    setErrorMessage('');

    try {
      setLoadUser(true);
      await axiosBaseUrlUser.delete('logout');
      dispatch(actionsAuth.userLoginFailure());
      window.location.href = '/';
      setLoadUser(false);
    } catch (err) {
      setLoadUser(false);
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
      {loadUser && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <Main>
        {showNewUpdateDeletePhoto && (
          <NewUpdateDeletePhotoDiv>
            <form encType="multipart/form-data">
              <div>
                <h1>Alterar foto de perfil</h1>
              </div>
              <div>
                <label htmlFor="new-user-foto">Adcionar nova foto</label>
                <input
                  type="file"
                  name="user-foto"
                  id="new-user-foto"
                  onChange={uploadUserPhoto}
                  size={2048576}
                  accept="image/png, image/jpeg"
                />
              </div>
              <div onClick={deleteUserPhoto}>
                <span id="delete-user-foto">Deletar foto</span>
              </div>
              <div onClick={() => setShowNewUpdateDelete(false)}>
                <span id="cancel-user-foto">Fechar</span>
              </div>
            </form>
          </NewUpdateDeletePhotoDiv>
        )}
        <ProfilePhoto
          onClick={() => setShowNewUpdateDelete(true)}
          title="Editar perfil"
        >
          <img
            id="user-foto"
            onLoad={() => setLoadUserPhoto(true)}
            onError={() => setLoadUserPhoto(true)}
            src={profileUrl.current ? profileUrl.current : userNotPhoto}
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
