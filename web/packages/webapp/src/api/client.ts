import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api/v1',
})

client.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
});


client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    window.location.href = '/';
  }
  return Promise.reject(error);
});
