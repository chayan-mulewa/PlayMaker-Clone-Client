// src/api/slices/address.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const addressApiSlice = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.USER_ADDRESS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
