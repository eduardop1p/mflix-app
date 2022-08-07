import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/genre/movie',
});

axiosRetry(axiosClient, {
  retryDelay: (retryCount) => retryCount * 1000,
  retries: 5,
});

export default axiosClient;
