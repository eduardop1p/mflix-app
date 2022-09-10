import { useSelector } from 'react-redux';

/* eslint-disable */

export default function MyRouter({ children }) {
  const backPage = document.referrer.replace(document.location.origin, '');
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  if (isLogedIn && backPage) {
    window.location.href = backPage;
    return;
  }
  if (isLogedIn) {
    window.location.href = '/';
    return;
  }

  return children;
}
