import axios, {  } from 'axios';

import { BACKEND_BASE } from '../utils/config';
import { store } from '../state';

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  
   const { currentUser } = store.getState()
   const {user}=currentUser
  //  console.log('user',user)

  if (user) {
    config.headers.Authorization = `Token ${user?.access}`;
    
  }

  // console.log('Axios Request', config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Axios Response', response);
    return response;
  },
  (error) => {
    // console.log('error', error);
    return Promise.reject(error);
  }
);



export default {axiosInstance}