import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id: number;
  name: string;
}

interface InitialState {
  loading: boolean;
  users: User[];
  error: string | undefined;
}

const initialState: InitialState = {
  loading: false,
  users: [],
  error: "",
};

const url = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get(url);
  return response.data.map((user: User) => user);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export { fetchUsers };
