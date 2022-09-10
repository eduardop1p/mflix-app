import { useSelector } from 'react-redux';

/* eslint-disable */

export default function MyRouter({ children }) {
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);

  if (!isLogedIn) {
    window.location.href = '/login';
    return;
  }

  return children;
}
