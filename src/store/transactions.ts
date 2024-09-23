import { bankAccountUpdate } from "./bankAccounts";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./createStore";
import transactionService from "../services/transaction.service";
import { IBankAccount, ITransaction, ITransactionCreate } from "../interfaces";
import { history } from "../utils/history";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    entities: [] as ITransaction[],
    isLoading: true,
    errors: null,
  },
  reducers: {
    transactionsRequested: (state) => {
      state.isLoading = true;
    },
    transactionsRecieved: (state, action) => {
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
    transactionsRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    transactionCreateRequested: (state) => {
      state.isLoading = true;
    },
    transactionCreateSuccesed: (state, action) => {
      if (action.payload) {
        state.entities.push(action.payload);
      }
      state.isLoading = false;
    },
    transactionCreateRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    transactionDeleteRequested: (state) => {
      state.isLoading = true;
    },
    transactionDeleteRequestSuccesed: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
      state.isLoading = false;
    },
    transactionDeleteRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: transactionsReducer, actions } = transactionsSlice;
const {
  transactionsRequested,
  transactionsRecieved,
  updateRequested,
  updateRequestSuccess,
  updateRequestFailed,
  transactionsRequestFailed,
  transactionCreateSuccesed,
  transactionCreateRequested,
  transactionCreateRequestFailed,
  transactionDeleteRequested,
  transactionDeleteRequestSuccesed,
  transactionDeleteRequestFailed,
} = actions;

export const loadTransactionsList =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(transactionsRequested());
    try {
      const { content } = await transactionService.getTransaction(userId);
      dispatch(transactionsRecieved(content));
    } catch (error) {
      dispatch(transactionsRequestFailed(error.message));
    }
  };
export const createTransaction =
  (transaction: ITransactionCreate) => async (dispatch: AppDispatch) => {
    dispatch(transactionCreateRequested());
    try {
      const { content } = await transactionService.createTransaction(
        transaction
      );
      dispatch(transactionCreateSuccesed(content));
      history.push("../../");
    } catch (error) {
      dispatch(transactionCreateRequestFailed(error.message));
    }
  };

export const deleteTransaction =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(transactionDeleteRequested());
    try {
      const { content } = await transactionService.deleteTransaction(id);
      if (!content) {
        dispatch(transactionDeleteRequestSuccesed(id));
      }
    } catch (error) {
      dispatch(transactionDeleteRequestFailed(error.message));
    }
  };

export const transactionUpdate =
  (data: ITransaction, updatedAccount: IBankAccount | null = null) =>
  async (dispatch: AppDispatch) => {
    dispatch(updateRequested());
    try {
      const { content } = await transactionService.updateTransaction(data);
      dispatch(updateRequestSuccess(content));
      if (updatedAccount !== null) {
        dispatch(bankAccountUpdate(updatedAccount));
      }
    } catch (error) {
      dispatch(updateRequestFailed(error.message));
    }
  };

export const getTransactions = () => (state: RootState) =>
  state.transactions.entities;
export const getExpenses = () => (state: RootState) =>
  state.transactions.entities.filter((item) => item.total < 0);
export const getTransactionsLoadingStatus = () => (state: RootState) =>
  state.transactions.isLoading;
export const getTransactionById =
  (transactionId: string) => (state: RootState) => {
    if (state.transactions.entities) {
      return state.transactions.entities.find((t) => t._id === transactionId);
    }
  };

export default transactionsReducer;
