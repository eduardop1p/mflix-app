/* eslint-disable */

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmail, isAlphanumeric } from 'validator/validator';

import * as actionsAuth from '../../../storeReactRedux/modules/auth/actions';
import axiosBaseUrlUser from '../../../services/axiosUserBaseUrl';
import LoadingForm from '../../../components/loadingForm/index';
import clearLinkTitle from '../../../config/clearLinkTitleConfig';
import MessageForm from '../../../components/messageForm';
import userNotPhoto from '../../../assets/images/profile-not-photo.jpg';
import {
  AccountManageContainer,
  InforPessContainer,
  DeleteAccountContainer,
} from './styled';

export default function accountManage() {
  const dispatch = useDispatch();
  const user = useRef(useSelector((state) => state.auth.user));

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function deleteUser() {
    setErrorMessage('');
    setSuccessMessage('');
    setShowDeleteAccount(false);

    try {
      setLoadUser(true);
      await axiosBaseUrlUser.delete(`users/${user.current.id}`);
      dispatch(actionsAuth.userLoginFailure());
      setSuccessMessage('Conta deletada com sucesso!');
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

  function creatNewAccount() {
    window.location.href = '/criar-conta';
  }

  return (
    <AccountManageContainer>
      {loadUser && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
          onClose={setshowFormMsg}
          deleteAccount
        />
      )}
      {showDeleteAccount && (
        <DeleteAccountContainer>
          <div>
            <h1>Tem&nbsp;certeza?</h1>
            <div>
              <button type="button" onClick={deleteUser}>
                Deletar
              </button>
              <button type="button" onClick={() => setShowDeleteAccount(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </DeleteAccountContainer>
      )}

      <div className="account-manage">
        <div>
          <button>Atualizar&nbsp;dados</button>
          <button onClick={creatNewAccount}>Criar&nbsp;nova&nbsp;conta</button>
          <button type="button" onClick={() => setShowDeleteAccount(true)}>
            Deletar&nbsp;conta
          </button>
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

  function alterPhoto(event) {
    const file = event.target.files[0];
    const userPhoto = document.querySelector('#user-foto-2');
    userPhoto.src = URL.createObjectURL(file);
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
    if (!isAlphanumeric(inputNome.value)) {
      setErrorMessage('Usuário deve conter apenas letras e números.');
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

      const file = document.querySelector('#new-user-foto-2').files[0];
      const formDataFile = new FormData();
      formDataFile.append('user-foto', file);

      const { data } = await axiosBaseUrlUser.post(
        `/fotos/${user.current.id}`,
        formDataFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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
          profileUrl: data.foto.url,
        })
      );
      setSuccessMessage('Dados atualizados com sucesso!');
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
          onClose={setshowFormMsg}
          updateUser={`/${clearLinkTitle(userNotRef.nome)}`}
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
              onChange={alterPhoto}
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
