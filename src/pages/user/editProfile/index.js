import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

import clearLinkTitle from '../../../config/clearLinkTitle';
import { EditProfileDivFather } from './styled';

export default function EditProfile() {
  const navigate = useNavigate();

  const user = useRef(useSelector((state) => state.auth.user));

  return (
    <EditProfileDivFather>
      <div className="edit-profile">
        <div className="close-edit-profile">
          <svg
            onClick={() => navigate(`/${clearLinkTitle(user.current.nome)}`)}
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
          >
            <path
              fill="#171A23"
              d="m10.458 32.083-2.541-2.541 9.5-9.542-9.5-9.542 2.541-2.541 9.542 9.5 9.542-9.5 2.541 2.541-9.5 9.542 9.5 9.542-2.541 2.541-9.542-9.5Z"
            />
          </svg>
        </div>
      </div>
    </EditProfileDivFather>
  );
}
