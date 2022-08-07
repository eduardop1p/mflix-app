import axios from 'axios';

export default axios.create({
  baseURL: 'https://mflix-server.herokuapp.com',
});
