import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    searchListParams: {
      name: undefined,
      categoryIds: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    },
  },
  reducers: {
    setSearhListFilters: (state, action) => {
      state.searchListParams = {
        ...action.payload,
        name: state.searchListParams.name,
      };
    },
    setSearhListName: (state, action) => {
      state.searchListParams = {
        ...state.searchListParams,
        name: action.payload,
      };
    },
  },
});

export const { setSearhListFilters, setSearhListName } = productSlice.actions;

export default productSlice.reducer;
