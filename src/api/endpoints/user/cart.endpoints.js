// src/api/endpoints/user/cart.endpoints.js
import { cartApiSlice } from "../../slices";
import { nanoid } from "nanoid";

export const cartApi = cartApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => ({
        url: "/",
        credentials: "include",
      }),
      providesTags: (result, error) =>
        result && result.data && result.data.carts
          ? [
              ...result.data.carts.map(({ _id }) => ({
                type: "Carts",
                id: _id,
              })),
              { type: "Carts", id: "LIST" },
            ]
          : [{ type: "Carts", id: "LIST" }],
    }),
    incressItemQuantity: builder.mutation({
      query: ({ id }) => ({
        url: `incress/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCarts", undefined, (draft) => {
            const cartItem = draft.data.carts.find(
              (cart) => cart.product._id === id
            );
            if (cartItem) {
              cartItem.product.quantity += 1;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Carts", id }],
    }),
    decreaseItemQuantity: builder.mutation({
      query: ({ id }) => ({
        url: `decrease/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCarts", undefined, (draft) => {
            const cartItem = draft.data.carts.find(
              (cart) => cart.product._id === id
            );

            if (cartItem) {
              // Check if the quantity is 1, if so remove the item, else decrement
              if (cartItem.product.quantity === 1) {
                // Remove the cart item entirely
                draft.data.carts = draft.data.carts.filter(
                  (cart) => cart.product._id !== id
                );
              } else {
                // Otherwise, decrease the quantity
                cartItem.product.quantity -= 1;
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Carts", id }],
    }),
    addItemToCart: builder.mutation({
      query: ({ data }) => ({
        url: "/",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      onQueryStarted: async ({ data }, { dispatch, queryFulfilled }) => {
        const tempId = nanoid();
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCarts", undefined, (draft) => {
            draft.data.carts.unshift({
              ...data,
              _id: tempId,
            });
          })
        );
        try {
          const { data: serverData } = await queryFulfilled;
          dispatch(
            cartApi.util.updateQueryData("getCarts", undefined, (draft) => {
              const index = draft.data.carts.findIndex(
                (cart) => cart._id === tempId
              );
              if (index !== -1) {
                draft.data.carts[index]._id = serverData._id;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),
  }),
});
