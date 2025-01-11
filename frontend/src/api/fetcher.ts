import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

export { AxiosError, AxiosResponse };

type ResponseError = {
  detail: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
};

const BASE_URI = "http://localhost:4000";

export const ALLOWED_CONTENT_TYPES = ["application/json", "text/html"];
export type AxiosResponseError = AxiosError<ResponseError>;

class Fetcher {
  private axiosInstance: AxiosInstance;
  // @ts-ignore
  private isTokenRefreshing = false;
  // @ts-ignore
  private requestQueue: Array<{ resolve: () => void }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URI,
    });
  }

  protected updateRequestConfig(config: InternalAxiosRequestConfig) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: this.getAuthenticationString(),
      },
    } as any;
  }

  private getAuthenticationString() {
    return `Bearer token`;
  }

  // @ts-ignore
  private getNewToken() {
    this.isTokenRefreshing = true;

    return Promise.resolve();
    // return keycloak.updateToken().then(() => {
    //   this.isTokenRefreshing = false;
    //   this.requestQueue.forEach(({ resolve }) => resolve());
    // });
  }

  public async request(config: AxiosRequestConfig) {
    const response = await this.axiosInstance.request(config);

    return response?.data;
  }
}

export const fetcher = new Fetcher();
