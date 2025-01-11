import { fetcher } from "@/api/fetcher.ts";
import { ResponseType, AxiosResponse } from "axios";

type BaseRequestParams = {
  url: string;
  responseType?: ResponseType;
  baseURL?: string;
};

type RequestWithData = {
  data: Record<any, any>;
  headers?: Record<string, string>;
};

export type GETRequest = BaseRequestParams;
export type DELETERequest = BaseRequestParams & Partial<RequestWithData>;
export type POSTRequest = BaseRequestParams & RequestWithData;
export type PUTRequest = BaseRequestParams & RequestWithData;
export type PATCHRequest = BaseRequestParams & RequestWithData;

class HttpClientClass {
  public get<T = any>({ url, responseType = "json", baseURL }: GETRequest) {
    return fetcher.request({
      method: "GET",
      responseType,
      url,
      baseURL,
    }) as Promise<AxiosResponse<T>>;
  }

  public delete<T = any>({ url, data = {}, baseURL }: DELETERequest) {
    return fetcher.request({
      method: "DELETE",
      url,
      data,
      baseURL,
    }) as Promise<AxiosResponse<T>>;
  }

  public post<T extends object = any>({ url, data = {}, headers = {}, responseType, baseURL }: POSTRequest) {
    return fetcher.request({
      method: "POST",
      responseType,
      url,
      data,
      headers,
      baseURL,
    }) as Promise<AxiosResponse<T>>;
  }

  public put<T = any>({ url, data = {}, baseURL }: PUTRequest) {
    return fetcher.request({
      method: "PUT",
      url,
      data,
      baseURL,
    }) as Promise<AxiosResponse<T>>;
  }

  public patch<T = any>({ url, data = {}, baseURL }: PATCHRequest) {
    return fetcher.request({
      method: "PATCH",
      url,
      data,
      baseURL,
    }) as Promise<AxiosResponse<T>>;
  }
}

export const HttpClient = new HttpClientClass();
