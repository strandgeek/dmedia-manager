import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

client.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
});
