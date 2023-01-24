/* eslint-disable */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { isEmail, isAlphanumeric } from 'validator/validator';
import { capitalize, get } from 'lodash';

import * as actionsLoading from '../../storeReactRedux/modules/loading/actions';
import * as actionsAuth from '../../storeReactRedux/modules/auth/actions';
import axiosUserBaseUrl from '../../services/axiosUserBaseUrl';
import LoadingForm from '../../components/loadingForm/index';
import MessageForm from '../../components/messageForm';
import userNotPhoto from '../../assets/images/profile-not-photo.jpg';
import {
  Main,
  ProfilePhoto,
  NewUpdateDeletePhotoDiv,
  AccountManageContainer,
  InforPessContainer,
  DeleteAccountContainer,
} from './styled';

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingApp = useSelector((state) => state.loading.loadingState);
  const { user } = useSelector((state) => state.auth);
  const { nome, foto } = user;

  const [showNewUpdateDeletePhoto, setShowNewUpdateDelete] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadUserPhoto, setLoadUserPhoto] = useState(false);

  useEffect(() => {
    if (loadUserPhoto && loadingApp) dispatch(actionsLoading.loadingFailure());
  }, [loadUserPhoto, loadingApp]);

  async function uploadUserPhoto(event) {
    setShowNewUpdateDelete(false);

    const file = event.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append('user-foto', file);

    const userFoto = document.body.querySelector('#user-foto');
    const userFoto2 = document.body.querySelector('#user-foto-2');

    try {
      setLoadUser(true);
      const { data } = await axiosUserBaseUrl.post(
        `/fotos/${user.id}`,
        formDataFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      userFoto.src = data.foto.url;
      userFoto2.src = data.foto.url;
      setSuccessMessage('Foto de perfil alterada.');
      setshowFormMsg(true);
    } catch (err) {
      if (get(err, 'response.data', false)) {
        const { data } = err.response;
        data.errors.map((err) => setErrorMessage(err));
        setshowFormMsg(true);
        return;
      }
      // setErrorMessage('Erro no servidor.');
      setErrorMessage(err);
      setshowFormMsg(true);
    } finally {
      setLoadUser(false);
    }
  }

  async function deleteUserPhoto() {
    setShowNewUpdateDelete(false);

    const userFoto = document.body.querySelector('#user-foto');
    const userFoto2 = document.body.querySelector('#user-foto-2');

    try {
      setLoadUser(true);
      await axiosUserBaseUrl.delete(`/fotos/${user.id}`);
      userFoto.src = userNotPhoto;
      userFoto2.src = userNotPhoto;
      setSuccessMessage('Foto de perfil deletada.');
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
    try {
      setLoadUser(true);
      await axiosUserBaseUrl.delete('logout');
      dispatch(actionsAuth.userLoginFailure());
      navigate('/login');
    } catch (err) {
      setshowFormMsg(true);
      setErrorMessage('Erro ao fazer logout.');
    } finally {
      setLoadUser(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>MFLIX - {capitalize(nome)}</title>
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
            src={foto.length ? foto[0].url : userNotPhoto}
            alt={nome}
          />
        </ProfilePhoto>
        <div className="profile-details">
          <h1>{capitalize(nome)}</h1>
          <div>
            <button type="button" onClick={() => setShowNewUpdateDelete(true)}>
              Editar perfil
            </button>
            <button className="logout" type="button" onClick={logoutUser}>
              Sair
            </button>
          </div>
        </div>

        <AccountManage user={user} />
      </Main>
    </>
  );
}

function AccountManage(props) {
  const dispatch = useDispatch();
  const { user } = props;

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function deleteUser() {
    setShowDeleteAccount(false);

    try {
      setLoadUser(true);
      await axiosUserBaseUrl.delete(`users/${user.id}`);
      dispatch(actionsAuth.userLoginFailure());
      setSuccessMessage('Conta deletada com sucesso!');
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
            <h1>Tem certeza?</h1>
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
          <button>Atualizar dados</button>
          <button onClick={creatNewAccount}>Criar nova conta</button>
          <button type="button" onClick={() => setShowDeleteAccount(true)}>
            Deletar conta
          </button>
        </div>
        <div>
          <InforPess user={user} />
        </div>
      </div>
    </AccountManageContainer>
  );
}

function InforPess(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = props;
  const { foto, nome, id, email } = user;

  const [loadUser, setLoadUser] = useState(false);
  const [showFormMsg, setshowFormMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function alterPhoto(event) {
    const file = event.target.files[0];
    const userPhoto = document.querySelector('#user-foto-2');
    userPhoto.src = URL.createObjectURL(file);
  }

  async function haldleValidaNewDataUser(event) {
    event.preventDefault();
    if (showFormMsg) return;

    const inputNome = event.target.querySelector('input#nome');
    const inputEmail = event.target.querySelector('input#email');
    const inputPassword = event.target.querySelector('input#password');
    const inputPasswordRepetir = event.target.querySelector(
      'input#repeat-password'
    );

    if (inputNome.value.length < 3 || inputNome.value.length > 8) {
      inputNome.blur();
      setErrorMessage('Usuário deve ter entre 3 e 8 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (!isAlphanumeric(inputNome.value)) {
      inputNome.blur();
      setErrorMessage('Usuário deve conter apenas letras e números.');
      setshowFormMsg(true);
      return;
    }
    if (!isEmail(inputEmail.value)) {
      inputEmail.blur();
      setErrorMessage('E-mail inválido.');
      setshowFormMsg(true);
      return;
    }
    if (inputPassword.value.length < 3 || inputPassword.value.length > 9) {
      inputPassword.blur();
      setErrorMessage('Senha deve ter entre 3 e 9 caracteres.');
      setshowFormMsg(true);
      return;
    }
    if (inputPasswordRepetir.value !== inputPassword.value) {
      inputPasswordRepetir.blur();
      setErrorMessage('As senhas não coincidem.');
      setshowFormMsg(true);
      return;
    }

    try {
      setLoadUser(true);

      let photo;
      const file = document.querySelector('#new-user-foto-2').files[0];
      if (file) {
        const formDataFile = new FormData();
        formDataFile.append('user-foto', file);

        const { data } = await axiosUserBaseUrl.post(
          `/fotos/${id}`,
          formDataFile,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        photo = data;
      }

      const newName = inputNome.value;
      const newEmail = inputEmail.value;
      const newPassword = inputPassword.value;
      const newRepetPassword = inputPasswordRepetir.value;

      await axiosUserBaseUrl.put(`/users/${id}`, {
        nome: newName,
        email: newEmail,
        password: newPassword,
        RepetPassword: newRepetPassword,
      });
      dispatch(
        actionsAuth.userNewDataSuccess({
          user: {
            id,
            nome: newName,
            email: newEmail,
            foto: file && photo ? [{ url: photo.foto.url }] : foto,
          },
        })
      );
      navigate(`/${newName}`);

      setSuccessMessage('Dados atualizados com sucesso!');
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

  return (
    <InforPessContainer>
      {loadUser && <LoadingForm />}
      {showFormMsg && (
        <MessageForm
          errorMessage={errorMessage}
          successMessage={successMessage}
          onClose={setshowFormMsg}
        />
      )}
      <div className="photo-alter">
        <span>Foto</span>
        <div>
          <img
            id="user-foto-2"
            src={foto.length ? foto[0].url : userNotPhoto}
            alt={nome}
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
        <form onSubmit={haldleValidaNewDataUser}>
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="nome"
                maxLength="8"
                name="nome"
                defaultValue={nome}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" defaultValue={email} />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="new-password">Nova senha</label>
              <input
                type="text"
                id="password"
                name="password"
                maxLength="9"
                placeholder="Nova senha"
              />
            </div>
            <div>
              <label htmlFor="repeat-password">Repetir senha</label>
              <input
                type="text"
                id="repeat-password"
                name="repeat password"
                maxLength="9"
                placeholder="Repetir senha"
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </InforPessContainer>
  );
}
