import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorageService";
import generateAuthError from "../services/generateAuthError";
import { ILoginPayload, IUser } from "../interfaces";
import { AppDispatch, RootState } from "./createStore";
// import history from "../utils/history";

const initialState = localStorageService.getToken()
  ? {
      entities: {},
      isLoading: true,
      errors: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataIsLoaded: false,
    }
  : {
      entities: {},
      isLoading: false,
      errors: null,
      auth: null,
      isLoggedIn: false,
      dataIsLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authRequested: (state) => {
      state.isLoading = true;
      state.errors = null;
    },
    updateRequested: (state) => {
      state.isLoading = true;
    },
    authRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    updateRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    updateRequestSuccess: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = {};
      state.isLoggedIn = false;
      state.auth = null;
      state.dataIsLoaded = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  authRequested,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  updateRequested,
  updateRequestFailed,
  updateRequestSuccess,
} = actions;

export const signUp = (payload: IUser) => async (dispatch: AppDispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.registration(payload);
    localStorageService.setToken(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("/users");
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      dispatch(authRequestFailed(generateAuthError(message)));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const logIn =
  (payload: ILoginPayload) => async (dispatch: AppDispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setToken(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        dispatch(authRequestFailed(generateAuthError(message)));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const userUpdate = (data: IUser) => async (dispatch: AppDispatch) => {
  dispatch(updateRequested());
  try {
    const { content } = await userService.update(data);
    dispatch(updateRequestSuccess(content));
  } catch (error) {
    dispatch(updateRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch: AppDispatch) => {
  localStorageService.removeAuthToken();
  dispatch(userLoggedOut());
};

export const getUser = () => (state: RootState) => state.users.entities;
export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getDataStatus = () => (state: RootState) =>
  state.users.dataIsLoaded;
export const getCurrentUserId = () => (state: RootState) =>
  state.users.auth?.userId;
export const getUsersLoadingStatus = () => (state: RootState) =>
  state.users.isLoading;
export const getAuthError = () => (state: RootState) => state.users.errors;
export default usersReducer;
