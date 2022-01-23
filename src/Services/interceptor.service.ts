
import axios, { AxiosRequestConfig } from 'axios';

axios.interceptors.request.use(async (request: any) => {
  const interceptorManager = (
  ): AxiosRequestConfig => {
    if (!request.url.includes('https')) {
        request.url = `${process.env.REACT_APP_URL_BASE}${request.url}`;
    }
    return request;
  };

  try {
    return interceptorManager();
  } catch (error: any) {
    console.error("Error")
  }
  return null;
});

axios.interceptors.response.use(
  (response) => {
    if (response.data.exito) {
      const { exito, mensaje, resultado } = response.data;
      if (exito) {
        return { ...response, data: resultado };
      } else {
        const error = new Error(mensaje ?? '');
        return Promise.reject(error);
      }
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
