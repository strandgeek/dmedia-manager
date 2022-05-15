import axios, { AxiosInstance } from 'axios'
import { useMemo } from 'react';

const createAxiosInstance = (baseURL: string, accessToken: string) => {
  const client = axios.create({
    baseURL,
  })
  
  client.interceptors.request.use(config => {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
  });
  return client
}

export const useAxios = ({
  baseURL,
  accessToken,
}: {
  baseURL: string
  accessToken: string
}): AxiosInstance => {
  return useMemo(() => createAxiosInstance(baseURL, accessToken), [baseURL, accessToken])
}
