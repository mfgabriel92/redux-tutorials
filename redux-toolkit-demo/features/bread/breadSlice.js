const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  noOfBreads: 10,
};

const breadSlice = createSlice({
  name: "bread",
  initialState,
  reducers: {
    ordered: (state) => {
      state.noOfBreads--;
    },
    restocked: (state, action) => {
      state.noOfBreads += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("cake/ordered", (state) => {
      state.noOfBreads--;
    });
  },
});

module.exports = breadSlice.reducer;
module.exports.breadActions = breadSlice.actions;
