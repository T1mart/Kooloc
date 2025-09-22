import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

const baseUrl: string = `${window.location.protocol}//${window.location.host}/api`;

const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default class ApiHttpClient {
  rawRequest(
    method: string,
    path: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<any>> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
      data,
      headers: { ...api.defaults.headers.common, ...headers },
    };
    return api.request(config);
  }

  restRequest<T>(
    method: string,
    path: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return api
      .request<T>({
        method,
        url: path,
        data,
        headers: { ...api.defaults.headers.common, ...headers },
      })
      .then((response) => response.data);
  }
}
