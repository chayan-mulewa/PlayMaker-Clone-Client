// src/api/slices/pant.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const pantMaterialApiSlice = createApi({
  reducerPath: "pantMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.PANTS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
