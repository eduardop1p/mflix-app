/* eslint-disable */

import { NavLink, Outlet } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actionsAuth from '../../../storeReactRedux/modules/auth/actions';
import axiosBaseUrlUser from '../../../services/axiosUserBaseUrl';
import LoadingForm from '../../../components/loadingForm/index';
import MessageForm from '../../../components/messageForm';
import userNotPhoto from '../../../assets/images/profile-not-photo.jpg';
import {
  AccountManageContainer,
  EditPhotoContainer,
  InforPessContainer,
} from './styled';

export default function accountManage() {
  return (
    <AccountManageContainer>
      <div className="account-manage">
        <div>
          <NavLink
            to="editar-foto-perfil"
            className={({ isActive }) =>
              isActive ? 'link-account-manage-active' : ''
            }
          >
            Editar&nbsp;foto
          </NavLink>
          <NavLink
            to="informacoes-pessoais"
            className={({ isActive }) =>
              isActive ? 'link-account-manage-active' : ''
            }
          >
            Infromações&nbsp;pessoais
          </NavLink>
          <NavLink
            to="deletar-conta"
            className={({ isActive }) =>
              isActive ? 'link-account-manage-active' : ''
            }
          >
            Deletar&nbsp;conta
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </AccountManageContainer>
  );
}

export function EditPhoto() {
  return (
    <EditPhotoContainer>
      <h1>Foto aqui</h1>
    </EditPhotoContainer>
  );
}

export function InforPess() {
  const dispatch = useDispatch();

  const user = useRef(useSelector((state) => state.auth.user));
  const profileUrl = useRef(useSelector((state) => state.auth.profileUrl));

  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    const hideFormMsgToBg = document.body.querySelector(
      '[data-bg-error-success]'
    );
    if (showFormMsg) {
      hideFormMsg.onclick = () => setshowFormMsg(false);
      window.onkeyup = (event) => event.keyCode === 13 && setshowFormMsg(false);
      hideFormMsgToBg.onclick = (event) =>
        event.target === event.currentTarget && setshowFormMsg(false);
    }
  }, [showFormMsg]);

  async function uploadUserPhoto(event) {
    setSuccessMessage('');
    setErrorMessage('');

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
      const { data } = err.response;
      data.error.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    } finally {
      setLoadUser(false);
    }
  }

  return (
    <InforPessContainer>
      {loadUser && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <div className="photo-alter">
        <span>Foto</span>
        <div>
          <img
            id="user-foto-2"
            src={profileUrl.current ? profileUrl.current : userNotPhoto}
            alt={user.current.nome}
          />
          <div>
            <label htmlFor="new-user-foto-2">Alterar</label>
            <input
              type="file"
              name="user-foto"
              id="new-user-foto-2"
              onChange={uploadUserPhoto}
              size={2048576}
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
      <div className="edit-name-email">
        <form>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="nome" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </form>
      </div>
    </InforPessContainer>
  );
}

export function DeletAccount() {
  return <h1>Deletar aqui</h1>;
}
