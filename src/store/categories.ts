import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./createStore";
import categoryService from "../services/categoryService";
import { ICategories } from "../interfaces";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: [] as ICategories[],
    isLoading: true,
    errors: null,
    lastFetch: 0,
  },
  reducers: {
    categoriesRequsted: (state) => {
      state.isLoading = true;
    },
    categoriesRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    categoriesRequestFailed: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequsted, categoriesRecieved, categoriesRequestFailed } =
  actions;

const isOutDated = (date: number) => {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  } else {
    return false;
  }
};

export const loadCategoriesList =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { lastFetch } = getState().categories;
    if (isOutDated(lastFetch)) {
      dispatch(categoriesRequsted());
      try {
        const { content } = await categoryService.get();
        dispatch(categoriesRecieved(content));
      } catch (error) {
        dispatch(categoriesRequestFailed(error.message));
      }
    }
  };

export const getCategoriesList = () => (state: RootState) =>
  state.categories.entities;

export const getCategoriesLoadingStatus = () => (state: RootState) =>
  state.categories.isLoading;

export default categoriesReducer;
