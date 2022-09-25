/* eslint-disable */

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmail } from 'validator/validator';

import * as actionsAuth from '../../../storeReactRedux/modules/auth/actions';
import axiosBaseUrlUser from '../../../services/axiosUserBaseUrl';
import LoadingForm from '../../../components/loadingForm/index';
import clearLinkTitle from '../../../config/clearLinkTitle';
import MessageForm from '../../../components/messageForm';
import userNotPhoto from '../../../assets/images/profile-not-photo.jpg';
import { AccountManageContainer, InforPessContainer } from './styled';

export default function accountManage() {
  return (
    <AccountManageContainer>
      <div className="account-manage">
        <div>
          <button>Atualizar&nbsp;dados</button>
          <button type="button">Deletar&nbsp;conta</button>
        </div>
        <div>
          <InforPess />
        </div>
      </div>
    </AccountManageContainer>
  );
}

function InforPess() {
  const dispatch = useDispatch();

  const user = useRef(useSelector((state) => state.auth.user));
  const userNotRef = useSelector((state) => state.auth.user);
  const profileUrl = useRef(useSelector((state) => state.auth.profileUrl));

  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const hideFormMsg = document.body.querySelector('#hide-msg-form');
    if (showFormMsg) {
      hideFormMsg.onclick = () => {
        setshowFormMsg(false);
        if (successMessage === 'Dados alterados com sucesso!')
          window.location.href = `/${clearLinkTitle(
            userNotRef.nome
          )}/informacoes-pessoais`;
      };
    }
  }, [showFormMsg, successMessage]);

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
      data.errors.map((err) => setErrorMessage(err));
      setshowFormMsg(true);
      console.clear();
    } finally {
      setLoadUser(false);
    }
  }

  async function haldleValidaNewDataUser() {
    setErrorMessage('');
    setSuccessMessage('');
    const editNEP = document.querySelector('.edit-name-email-password');
    const inputNome = editNEP.querySelector('input#nome');
    const inputEmail = editNEP.querySelector('input#email');
    const inputPassword = editNEP.querySelector('input#password');
    const inputPasswordRepetir = editNEP.querySelector('input#repeat-password');

    if (inputNome.value.length < 3 || inputNome.value.length > 8) {
      setErrorMessage('Usuário deve ter entre 3 e 8 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (!isEmail(inputEmail.value)) {
      setErrorMessage('E-mail inválido.');
      setshowFormMsg(true);
      return;
    }
    if (inputPassword.value.length < 3 || inputPassword.value.length > 9) {
      setErrorMessage('Senha deve ter entre 3 e 9 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (inputPasswordRepetir.value !== inputPassword.value) {
      setErrorMessage('As senhas não coincidem.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadUser(true);
      await axiosBaseUrlUser.put(`/users/${user.current.id}`, {
        nome: inputNome.value,
        email: inputEmail.value,
        password: inputPassword.value,
        RepetPassword: inputPasswordRepetir.value,
      });
      dispatch(
        actionsAuth.userNewDataSuccess({
          user: {
            id: user.current.id,
            nome: inputNome.value,
            email: inputEmail.value,
            session: {
              id: user.current.session.id,
              expires: user.current.session.expires,
            },
          },
        })
      );
      setSuccessMessage('Dados alterados com sucesso!');
      setshowFormMsg(true);
    } catch (err) {
      const { data } = err.response;
      data.errors.map((err) => setErrorMessage(err));
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
      <div className="edit-name-email-password">
        <form>
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="nome"
                maxLength="8"
                name="nome"
                defaultValue={user.current.nome}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={user.current.email}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="new-password">Nova&nbsp;senha</label>
              <input
                type="text"
                id="password"
                name="password"
                maxLength="9"
                placeholder="Nova senha"
              />
            </div>
            <div>
              <label htmlFor="repeat-password">Repetir&nbsp;senha</label>
              <input
                type="text"
                id="repeat-password"
                name="repeat password"
                maxLength="9"
                placeholder="Repetir senha"
              />
            </div>
          </div>
        </form>
      </div>
      <button id="save-alter-user" onClick={haldleValidaNewDataUser}>
        Salvar
      </button>
    </InforPessContainer>
  );
}
