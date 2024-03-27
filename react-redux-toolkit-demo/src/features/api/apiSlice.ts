import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: number;
  name: string;
}

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/userss",
    }),
  }),
});

export default apiSlice;
export const { useGetUsersQuery } = apiSlice;
