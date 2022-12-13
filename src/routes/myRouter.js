import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

/* eslint-disable */

export default function MyRouter({ children }) {
  const location = useLocation();

  const backPage = document.referrer.replace(document.location.origin, '');
  const { isLogedIn } = useSelector((state) => state.auth);
  const back = new URLSearchParams(location.search).get('redirect');

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
