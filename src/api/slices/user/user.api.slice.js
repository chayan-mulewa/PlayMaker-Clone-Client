// src/api/slices/user.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER  } from "../../../config";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.USER_PROFILE }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
