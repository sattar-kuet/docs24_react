import { apiSlice } from "../api/apiSlice";

export const signatureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // update signature
    updateSignature: builder.mutation({
      query: (data) => ({
        url: "update_signature",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Signature"],
    }),

    // get signature
    getSignature: builder.query({
      query: (data) => ({
        url: "get_signature",
        method: "POST",
        body: data,
      }),
      providesTags: ["Signature"],
    }),
  }),
});

export const { useUpdateSignatureMutation, useGetSignatureQuery } =
  signatureApi;
