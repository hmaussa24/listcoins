import http, { AxiosRequestConfig, AxiosResponse } from "axios";
import "./interceptor.service"
export const httpGet = <R>(url: string, config?: Pick<AxiosRequestConfig, 'params' | 'headers' | 'responseType'>): Promise<AxiosResponse<R>> => http.get<R>(url, { ...config });