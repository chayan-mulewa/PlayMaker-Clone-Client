// src/api/endpoints/user/address.endpoints.js
import { addressApiSlice } from "../../slices";
import { nanoid } from "nanoid";

export const addressApi = addressApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: "/",
        credentials: "include",
      }),
      providesTags: (result, error) =>
        result && result.data && result.data.addresses
          ? [
              ...result.data.addresses.map(({ _id }) => ({
                type: "Addresses",
                id: _id,
              })),
              { type: "Addresses", id: "LIST" },
            ]
          : [{ type: "Addresses", id: "LIST" }],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          addressApi.util.updateQueryData(
            "getAddresses",
            undefined,
            (draft) => {
              const index = draft.data.addresses.findIndex(
                (address) => address._id === id
              );
              if (index !== -1) {
                draft.data.addresses[index] = {
                  ...draft.data.addresses[index],
                  ...data,
                };
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Addresses", id }],
    }),
    deleteAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          addressApi.util.updateQueryData(
            "getAddresses",
            undefined,
            (draft) => {
              draft.data.addresses = draft.data.addresses.filter(
                (address) => address._id !== id
              );
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    createAddress: builder.mutation({
      query: ({ data }) => ({
        url: "/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      onQueryStarted: async ({ data }, { dispatch, queryFulfilled }) => {
        // Generate a temporary ID for the new Address
        const tempId = nanoid();

        // Optimistically update the cache
        const patchResult = dispatch(
          addressApi.util.updateQueryData(
            "getAddresses",
            undefined,
            (draft) => {
              // Add the new Address to the beginning of the list
              draft.data.addresses.unshift({
                ...data,
                _id: tempId, // Temporary ID
              });
            }
          )
        );

        try {
          // Wait for the server response
          const { data: serverData } = await queryFulfilled;

          // Replace the temporary ID with the real ID from the server
          dispatch(
            addressApi.util.updateQueryData(
              "getAddresses",
              undefined,
              (draft) => {
                const index = draft.data.addresses.findIndex(
                  (address) => address._id === tempId
                );
                if (index !== -1) {
                  draft.data.addresses[index]._id = serverData._id;
                }
              }
            )
          );
        } catch {
          // If the server request fails, undo the optimistic update
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Addresses", id: "LIST" }],
    }),
  }),
});
