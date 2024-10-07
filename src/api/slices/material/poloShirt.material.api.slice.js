// src/api/slices/poloShirt.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const poloShirtMaterialApiSlice = createApi({
  reducerPath: "poloShirtMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.POLO_SHIRTS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
