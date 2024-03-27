import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "../cake/cakeSlice";

interface InitialState {
  noOfBreads: number;
}

const initialState: InitialState = {
  noOfBreads: 10,
};

const breadSlice = createSlice({
  name: "bread",
  initialState,
  reducers: {
    ordered: (state, action: PayloadAction<number>) => {
      state.noOfBreads -= action.payload;
    },
    restocked: (state, action: PayloadAction<number>) => {
      state.noOfBreads += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.noOfBreads--;
    });
  },
});

export default breadSlice.reducer;
export const { ordered, restocked } = breadSlice.actions;
