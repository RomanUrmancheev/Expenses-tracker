import axios, { AxiosHeaders } from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorageService";
import authService from "./auth.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired =
      refreshToken && expiresDate && Number(expiresDate) < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setToken(data);
    }
    const accessToken = localStorageService.getToken();
    if (accessToken) {
      (config.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
