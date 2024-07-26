 import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
 import { from, Observable } from 'rxjs';
import axiosIns from './axios'

const {axiosInstance}=axiosIns
const get = <T>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => from(axiosInstance.get<T>(url, config));

const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => from(axiosInstance.post<T>(url, data, config));

const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => from(axiosInstance.put<T>(url, data, config))

const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => from(axiosInstance.patch<T>(url, data, config))

export default { get, post, put,patch };
