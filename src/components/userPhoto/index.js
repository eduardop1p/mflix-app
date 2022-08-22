import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* eslint-disable */

import * as actions from '../../storeReactRedux/modules/loadUserPhoto/actions';
import axiosBaseUrlUser from '../../services/axiosUserBaseUrl';
import clearLinkTitle from '../../config/clearLinkTitle';
import userNotPhoto from '../../assets/images/profile-not-photo.jpg';
import ProfilePhoto from './styled';

export default function UserPhoto() {
  const [userPhotoUrl, setUserPhotoUrl] = useState('');
  const [loadUserPhoto, setLoadUserPhoto] = useState(false);
  const user = useRef(useSelector((state) => state.auth.user));
  const dispath = useDispatch();

  useEffect(() => {
    user.current._id && getUserPhoto();
  }, []);

  async function getUserPhoto() {
    try {
      const { data } = await axiosBaseUrlUser.get(
        `/fotos/${user.current._id}`,
        {
          headers: { Authorization: user.current.session.id },
        }
      );
      setUserPhotoUrl(data.url);
    } catch (err) {
      console.clear();
    }
  }

  return (
    <ProfilePhoto title="Editar perfil">
      <Link
        to={clearLinkTitle(
          `/${user.current.nome !== 'visitor' && user.current.nome}`
        )}
        reloadDocument
      >
        <div className="profile-photo">
          <img
            onLoad={() => {
              setLoadUserPhoto(true);
              dispath(actions.loadUserPhotoSuccess({ loadUserPhoto: true }));
            }}
            src={userPhotoUrl ? userPhotoUrl : userNotPhoto}
          />
        </div>
      </Link>
    </ProfilePhoto>
  );
}
