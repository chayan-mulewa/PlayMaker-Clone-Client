// src/api/slices/auth.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.AUTH }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
