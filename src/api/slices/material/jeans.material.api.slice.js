// src/api/slices/jeans.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const jeansMaterialApiSlice = createApi({
  reducerPath: "jeansMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.JEANS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
