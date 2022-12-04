/* eslint-disable */

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { capitalize, get } from 'lodash';

import * as actionsLoading from '../../storeReactRedux/modules/loading/actions';
import * as actionsAuth from '../../storeReactRedux/modules/auth/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import AccountManage from './accountManage/index';
import MessageForm from '../../components/messageForm';
import userNotPhoto from '../../assets/images/profile-not-photo.jpg';
import { Main, ProfilePhoto, NewUpdateDeletePhotoDiv } from './styled';

export default function User() {
  const dispatch = useDispatch();
  const user = useRef(useSelector((state) => state.auth.user));
  const { session } = useSelector((state) => state.auth.user);
  const profileUrl = useRef(useSelector((state) => state.auth.profileUrl));
  const loadingApp = useSelector((state) => state.loading.loadingState);

  const [showNewUpdateDeletePhoto, setShowNewUpdateDelete] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadUserPhoto, setLoadUserPhoto] = useState(false);

  useEffect(() => {
    if (loadUserPhoto && loadingApp) dispatch(actionsLoading.loadingFailure());
    axiosBaseUrlUser.defaults.headers = { Authorization: session.id };
  }, [loadUserPhoto, loadingApp]);

  async function uploadUserPhoto(event) {
    setSuccessMessage('');
    setErrorMessage('');
    setShowNewUpdateDelete(false);

    const file = event.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append('user-foto', file);
    const userFoto = document.body.querySelector('#user-foto');
    const userFoto2 = document.body.querySelector('#user-foto-2');
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
      userFoto.src = data.foto.url;
      userFoto2.src = data.foto.url;
      dispatch(
        actionsAuth.userLoginPhotoSuccess({ profileUrl: data.foto.url })
      );
      setSuccessMessage('Foto de perfil alterada.');
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
      setLoadUser(false);
    }
  }

  async function deleteUserPhoto() {
    setSuccessMessage('');
    setErrorMessage('');
    setShowNewUpdateDelete(false);

    const userFoto = document.body.querySelector('#user-foto');
    const userFoto2 = document.body.querySelector('#user-foto-2');

    try {
      setLoadUser(true);
      await axiosBaseUrlUser.delete(`/fotos/${user.current.id}`);

      userFoto.src = userNotPhoto;
      userFoto2.src = userNotPhoto;
      setSuccessMessage('Foto de perfil deletada.');
      dispatch(actionsAuth.userLoginPhotoFailure());
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
      setLoadUser(false);
    }
  }

  async function logoutUser() {
    setErrorMessage('');

    try {
      setLoadUser(true);
      await axiosBaseUrlUser.delete('logout');
      dispatch(actionsAuth.userLoginFailure());
      window.location.href = '/';
    } catch (err) {
      setshowFormMsg(true);
      setErrorMessage('Erro ao fazer logout.');
      console.clear();
    } finally {
      setLoadUser(false);
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
          onClose={setshowFormMsg}
        />
      )}
      <Main>
        {showNewUpdateDeletePhoto && (
          <NewUpdateDeletePhotoDiv
            onClick={(event) =>
              event.target === event.currentTarget &&
              setShowNewUpdateDelete(false)
            }
          >
            <form encType="multipart/form-data">
              <div>
                <h1>Alterar&nbsp;foto&nbsp;de&nbsp;perfil</h1>
              </div>
              <div>
                <label htmlFor="new-user-foto">
                  Adcionar&nbsp;nova&nbsp;foto
                </label>
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
                <span id="delete-user-foto">Deletar&nbsp;foto</span>
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
          <div>
            <button type="button" onClick={() => setShowNewUpdateDelete(true)}>
              Editar&nbsp;perfil
            </button>
            <button className="logout" type="button" onClick={logoutUser}>
              Sair
            </button>
          </div>
        </div>

        <AccountManage />
      </Main>
    </>
  );
}
