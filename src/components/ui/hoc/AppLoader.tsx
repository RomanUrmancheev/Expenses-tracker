import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUser,
} from "../../../store/users";
import { useEffect } from "react";
import { IAppLoaderProps } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { loadBankAccountsList } from "../../../store/bankAccounts";
import localStorageService from "../../../services/localStorageService";
import { loadTransactionsList } from "../../../store/transactions";
import { loadCategoriesList } from "../../../store/categories";

const AppLoader = ({ children }: IAppLoaderProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const usersStatusLoading = useAppSelector(getUsersLoadingStatus());
  const currentUserId = localStorageService.getUserId();
  useEffect(() => {
    if (isLoggedIn) {
      //TODO add other data load
      dispatch(loadUser());
      if (currentUserId) {
        dispatch(loadTransactionsList(currentUserId));
        dispatch(loadBankAccountsList(currentUserId));
        dispatch(loadCategoriesList());
      }
    }
  }, [isLoggedIn]);
  if (usersStatusLoading) return "Loading";
  return children;
};

export default AppLoader;
