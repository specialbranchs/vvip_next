import axios from "axios";
import { PIMS_URL } from "./url";
import { store } from "../state";

const axiosInstance = axios.create({
  baseURL: PIMS_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  let {currentpimState} = store.getState()
  let {pimState}=currentpimState
  config.headers.Authorization = `Bearer ${pimState}`;

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

export default { axiosInstance };
