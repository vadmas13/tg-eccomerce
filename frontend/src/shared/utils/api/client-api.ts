import { accessTokenCookieKey } from "@shared/consts";
import { getCookies } from "@shared/utils";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ClientApi {
  coockieKey = accessTokenCookieKey;
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  private getToken(): string {
    const bearerToken = getCookies(this.coockieKey);
    if (!bearerToken) {
      throw new Error("Отсутствует токен авторизации");
    }
    return bearerToken as string;
  }

  async get<T>(url: string, conf?: AxiosRequestConfig) {
    try {
      const token = this.getToken();
      const data = await this.axiosInstance.get<T>(url, {
        ...conf,
        headers: { Authorization: token, ...conf?.headers },
      });
      return data as AxiosResponse<T>;
    } catch (e) {
      console.log("error", e);
      return e as AxiosResponse<T>;
    }
  }

  post<T, TDto>(url: string, data: TDto, conf?: AxiosRequestConfig) {
    const token = this.getToken();
    return this.axiosInstance.post<T>(url, data, {
      ...conf,
      headers: { Authorization: token, ...conf?.headers },
    });
  }

  put<T, TDto>(url: string, data: TDto, conf?: AxiosRequestConfig) {
    const token = this.getToken();
    return this.axiosInstance.put<T>(url, data, {
      ...conf,
      headers: { Authorization: token, ...conf?.headers },
    });
  }

  patch<T, TDto>(url: string, data: TDto, conf?: AxiosRequestConfig) {
    const token = this.getToken();
    return this.axiosInstance.patch<T>(url, data, {
      ...conf,
      headers: { Authorization: token, ...conf?.headers },
    });
  }

  delete<T>(url: string, conf?: AxiosRequestConfig) {
    const token = this.getToken();
    return this.axiosInstance.delete<T>(url, {
      ...conf,
      headers: { Authorization: token, ...conf?.headers },
    });
  }
}

export const clientApi = new ClientApi();
