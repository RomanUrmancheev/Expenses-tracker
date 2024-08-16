import { createSlice } from "@reduxjs/toolkit";
import bankAccountService from "../services/bankAccountService";
import { AppDispatch, RootState } from "./createStore";
import { IBankAccount } from "../interfaces";
import { history } from "../utils/history";
import { toast } from "react-toastify";

const bankAccountsSlice = createSlice({
  name: "bankAccounts",
  initialState: {
    entities: [] as IBankAccount[],
    isLoading: true,
    errors: null,
  },
  reducers: {
    bankAccountsRequested: (state) => {
      state.isLoading = true;
    },
    bankAccountsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    updateRequested: (state) => {
      state.isLoading = true;
    },
    updateRequestSuccess: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
      state.isLoading = false;
    },
    updateRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    bankAccountsRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    bankAccountCreateRequested: (state) => {
      state.isLoading = true;
    },
    bankAccountCreateSuccesed: (state, action) => {
      if (action.payload) {
        state.entities.push(action.payload);
      }
      state.isLoading = false;
    },
    bankAccountCreateRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    bankAccountDeleteRequested: (state) => {
      state.isLoading = true;
    },
    bankAccountDeleteRequestSuccesed: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
      state.isLoading = false;
    },
    bankAccountDeleteRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: bankAccountsReducer, actions } = bankAccountsSlice;
const {
  bankAccountsRequested,
  bankAccountsRecieved,
  updateRequested,
  updateRequestSuccess,
  updateRequestFailed,
  bankAccountsRequestFailed,
  bankAccountCreateSuccesed,
  bankAccountCreateRequested,
  bankAccountCreateRequestFailed,
  bankAccountDeleteRequested,
  bankAccountDeleteRequestSuccesed,
  bankAccountDeleteRequestFailed,
} = actions;

export const loadBankAccountsList =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(bankAccountsRequested());
    try {
      const { content } = await bankAccountService.getBankAccount(userId);
      dispatch(bankAccountsRecieved(content));
    } catch (error) {
      dispatch(bankAccountsRequestFailed(error.message));
    }
  };
export const createBankAccount =
  (bankAccount: IBankAccount) => async (dispatch: AppDispatch) => {
    dispatch(bankAccountCreateRequested());
    try {
      const { content } = await bankAccountService.createBankAccount(
        bankAccount
      );
      dispatch(bankAccountCreateSuccesed(content));
      history.push("../");
    } catch (error) {
      dispatch(bankAccountCreateRequestFailed(error.message));
    }
  };

export const deleteBankAccount =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(bankAccountDeleteRequested());
    try {
      const { content } = await bankAccountService.deleteBankAccount(id);
      if (!content) {
        dispatch(bankAccountDeleteRequestSuccesed(id));
      }
    } catch (error) {
      dispatch(bankAccountDeleteRequestFailed(error.message));
    }
  };

export const bankAccountUpdate =
  (data: IBankAccount) => async (dispatch: AppDispatch) => {
    dispatch(updateRequested());
    try {
      const { content } = await bankAccountService.updateBankAccount(data);
      dispatch(updateRequestSuccess(content));
      toast.success("Bank account updated");
    } catch (error) {
      dispatch(updateRequestFailed(error.message));
    }
  };

export const getBankAccounts = () => (state: RootState) =>
  state.bankAccounts.entities;
export const getBankAccountsLoadingStatus = () => (state: RootState) =>
  state.bankAccounts.isLoading;

export default bankAccountsReducer;
