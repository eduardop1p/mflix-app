import axios from 'axios';

/* eslint-disable */

import auth from '../config/authLocalStorageConfig';

function headers() {
  const { isLogedIn } = auth;
  if (!isLogedIn) return;

  const sessionId = auth.user.session.id;
  return {
    Authorization: sessionId,
  };
}

export default axios.create({
  baseURL: 'https://mflix-server.herokuapp.com',
  headers: headers(),
});
