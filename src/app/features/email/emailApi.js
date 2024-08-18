import { apiSlice } from "../api/apiSlice";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get email template
    getEmailTemplate: builder.query({
      query: (data) => ({
        url: "email/templates",
        method: "POST",
        body: data,
      }),
      providesTags: ["Email"],
    }),

    // get email log or list
    getEmailLog: builder.query({
      query: (data) => ({
        url: "email/log",
        method: "POST",
        body: data,
      }),
      providesTags: ["Email"],
    }),
    // send email
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "email/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Email"],
    }),

    // delete email log
    deleteEmailLog: builder.mutation({
      query: (data) => ({
        url: `email/log/delete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Email"],
    }),
  }),
});

export const {
  useGetEmailTemplateQuery,
  useGetEmailLogQuery,
  useSendEmailMutation,
  useDeleteEmailLogMutation,
} = emailApi;
