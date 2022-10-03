import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* eslint-disable */

import clearLinkTitle from '../../config/clearLinkTitle';
import userNotPhoto from '../../assets/images/profile-not-photo.jpg';
import ProfilePhoto from './styled';

export default function UserPhoto(props) {
  const { width60 } = props;

  const [loadUserPhoto, setLoadUserPhoto] = useState(false);
  const user = useRef(useSelector((state) => state.auth.user));
  const isLogedIn = useRef(useSelector((state) => state.auth.isLogedIn));
  const profileUrl = useSelector((state) => state.auth.profileUrl);

  return (
    <ProfilePhoto title="Editar perfil" width60={width60}>
      <Link
        to={clearLinkTitle(`/${isLogedIn ? user.current.nome : ''}`)}
        reloadDocument
      >
        <div className="profile-photo">
          <img
            onLoad={() => setLoadUserPhoto(true)}
            onError={() => setLoadUserPhoto(true)}
            src={profileUrl ? profileUrl : userNotPhoto}
            alt={user.current.nome}
          />
        </div>
      </Link>
    </ProfilePhoto>
  );
}
