import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

// Create an axios instance with default configurations
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      config => {
        if (token) {
          console.log('Adding token to request headers:', token);
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.log('No token found');
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Add response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.log('Error tracked in the interceptor', error.response);
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate, token]);

  return axiosSecure;
};

export default useAxiosSecure;
