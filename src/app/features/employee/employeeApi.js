import { apiSlice } from "../api/apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create a new employee
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "employee/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),

    // get employee list
    getEmployeeList: builder.query({
      query: (data) => ({
        url: "employee/list",
        method: "POST",
        body: data,
      }),
      providesTags: ["Employee"],
    }),

    // update employee
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: "employee/edit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetEmployeeListQuery,
  useUpdateEmployeeMutation,
} = employeeApi;
