import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "@shared/api/getBaseQuery";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: getBaseQuery(true),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (userId) => `/transactions/${userId}`,
    }),
    getFriendssWithWallets: builder.query({
      query: (userId) => `/transactions/${userId}/friends`,
    }),
    createTransaction: builder.mutation({
      query: ({userId, transaction}) => ({
        url: `/transactions/${userId}`,
        method: "POST",
        body: transaction,
      }),
    }),
    addWallet: builder.mutation({
      query: ({ userId, wallet }) => ({
        url: `/transactions/add-wallet/${userId}`,
        method: "PUT",
        body: { wallet },
      }),
    }),
    deleteWallet: builder.mutation({
      query: (userId) => ({
        url: `/transactions/delete-wallet/${userId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetFriendssWithWalletsQuery,
  useCreateTransactionMutation,
  useAddWalletMutation,
  useDeleteWalletMutation,
} = transactionApi;
