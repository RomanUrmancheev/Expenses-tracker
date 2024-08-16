import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import bankAccountsReducer from "./bankAccounts";
import transactionsReducer from "./transactions";
import categoriesReducer from "./categories";

const rootReducer = combineReducers({
  users: usersReducer,
  bankAccounts: bankAccountsReducer,
  transactions: transactionsReducer,
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
