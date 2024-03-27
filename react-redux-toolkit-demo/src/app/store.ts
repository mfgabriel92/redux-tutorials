import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import breadSlice from "../features/bread/breadSlice";
import cakeSlice from "../features/cake/cakeSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    cake: cakeSlice,
    bread: breadSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
