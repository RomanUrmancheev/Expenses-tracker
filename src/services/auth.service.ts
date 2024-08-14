import axios from "axios";
import localStorageService from "./localStorageService";
import config from "../config.json";
import { ILoginPayload, IUser } from "../interfaces";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/",
});

const authService = {
  registration: async (payload: IUser) => {
    const { data } = await httpAuth.post("signUp", payload);
    return data;
  },
  login: async ({ email, password }: ILoginPayload) => {
    const { data } = await httpAuth.post("signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refreshToken: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
