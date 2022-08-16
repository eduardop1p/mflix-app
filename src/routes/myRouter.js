import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

/* eslint-disable */

export default function MyRouter({ children }) {
  const location = useLocation();
  const redirectBack = new URLSearchParams(location.search).get('redirect');
  const backPage = document.referrer.replace(document.location.origin, '');

  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  if (isLogedIn && redirectBack && backPage) {
    window.location.href = backPage;
    return;
  }
  if (isLogedIn) {
    window.location.href = '/';
    return;
  }

  return children;
}
