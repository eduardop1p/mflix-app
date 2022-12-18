import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* eslint-disable */

import clearLinkTitle from '../../config/clearLinkTitleConfig';
import userNotPhoto from '../../assets/images/profile-not-photo.jpg';
import ProfilePhoto from './styled';

export default function UserPhoto(props) {
  const { width60, width40 } = props;

  const { user } = useSelector((state) => state.auth);
  const { foto, nome } = user;

  return (
    <ProfilePhoto title="Editar perfil" width60={width60} width40={width40}>
      <Link to={`/${clearLinkTitle(nome)}`} reloadDocument>
        <div className="profile-photo">
          <img src={foto.length ? foto[0].url : userNotPhoto} alt={nome} />
        </div>
      </Link>
    </ProfilePhoto>
  );
}
