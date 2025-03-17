import { createSlice } from "@reduxjs/toolkit";
import { getEntityFilterCount } from "@shared/utils";

const productSlice = createSlice({
  name: "product",
  initialState: {
    searchListParams: {
      name: undefined,
      categoryIds: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    },
    searchListParamsCount: 0,
  },
  reducers: {
    setSearhListFilters: (state, action) => {
      state.searchListParams = {
        ...action.payload,
        name: state.searchListParams.name,
      };
      state.searchListParamsCount =
        getEntityFilterCount(state.searchListParams) ?? 0;
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
