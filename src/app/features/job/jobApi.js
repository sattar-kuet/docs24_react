import { apiSlice } from "../api/apiSlice";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get job list
    getJobList: builder.query({
      query: () => ({
        url: "job/list",
        method: "POST",
        body: {},
      }),
      providesTags: ["Job"],
    }),

    // get job detail
    getJobDetails: builder.query({
      query: (url) => ({
        url: url,
        method: "POST",
        body: {},
      }),
      providesTags: ["Job"],
    }),

    // apply job
    applyjob: builder.mutation({
      query: (data) => ({
        url: "job/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobListQuery,
  useGetJobDetailsQuery,
  useApplyjobMutation,
} = jobApi;
