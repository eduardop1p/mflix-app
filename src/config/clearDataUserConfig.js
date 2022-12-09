/* eslint-disable */

export function clearDataUserSession(data) {
  return {
    id: data.session.id,
    expires: new Date(data.session.expires).getTime(),
  };
}

export default function clearDataUser(data) {
  return {
    id: data._id,
    nome: data.nome,
    email: data.email,
    foto: data.foto,
  };
}
