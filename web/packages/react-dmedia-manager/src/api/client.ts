import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:4000/api/v1',
})

client.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
});
