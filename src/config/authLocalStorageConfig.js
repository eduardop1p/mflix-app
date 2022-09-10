const getAuth = JSON.parse(localStorage.getItem('persist:auth'));
const auth = JSON.parse(getAuth.auth);

export default auth;
