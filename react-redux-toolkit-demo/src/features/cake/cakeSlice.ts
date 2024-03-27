import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  noOfCakes: number;
}

const initialState: InitialState = {
  noOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state, action: PayloadAction<number>) => {
      state.noOfCakes -= action.payload;
    },
    restocked: (state, action: PayloadAction<number>) => {
      state.noOfCakes += action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
