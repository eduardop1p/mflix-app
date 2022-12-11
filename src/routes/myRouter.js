import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

/* eslint-disable */

import { userLoginFailure } from '../storeReactRedux/modules/auth/actions';

export default function MyRouter({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const backPage = document.referrer.replace(document.location.origin, '');
  const { isLogedIn } = useSelector((state) => state.auth);
  const isLogedInRef = useRef(
    useSelector((state) => state.auth.isLogedIn)
  ).current;
  const back = new URLSearchParams(location.search).get('redirect');
  const logout = new URLSearchParams(location.search).get('logout');

  if (isLogedInRef && logout) {
    dispatch(userLoginFailure());
    return children;
  }

  if (isLogedIn && backPage && back) {
    window.location.href = backPage;
    return;
  }
  if (isLogedIn) {
    window.location.href = '/';
    return;
  }

  return children;
}
