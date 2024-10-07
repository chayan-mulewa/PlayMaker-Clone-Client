// src/api/slices/coat.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const coatMaterialApiSlice = createApi({
  reducerPath: "coatMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.COATS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
