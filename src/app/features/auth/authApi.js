import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // user signup
    userSignup: builder.mutation({
      query: (user) => ({
        url: "custom/registration2",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["AuthUser"],
    }),

    // user login
    userLogin: builder.mutation({
      query: (user) => ({
        url: "web/session/authenticate",
        method: "POST",
        body: user,
      }),

      // login operations after query fulfilled
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.result) {
            const userInfo = {
              uid: data?.result?.uid,
              name: data?.result?.name,
              email: data?.result?.username,
              is_admin: data?.result?.is_admin,
            };

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            dispatch(userLoggedIn(userInfo));
          }
        } catch (error) {
          // no need to catch error here
        }
      },
      invalidatesTags: ["AuthUser"],
    }),

    // user status check
    userCheck: builder.mutation({
      query: (credential) => ({
        url: "user/status",
        method: "POST",
        body: credential,
      }),
      providesTags: ["AuthUser"],
    }),

    // user email check
    emailCheck: builder.mutation({
      query: (credential) => ({
        url: "user/check_email",
        method: "POST",
        body: credential,
      }),
      // providesTags: ["AuthUser"],
    }),

    // verify email
    emailVerify: builder.mutation({
      query: (credential) => ({
        url: "email/verify",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: ["AuthUser"],
    }),

    // reset password
    resetPassword: builder.mutation({
      query: (credential) => ({
        url: "user/password/reset",
        method: "POST",
        body: credential,
      }),
    }),

    // user logout
    userLogout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        body: {},
      }),

      // login operations after query fulfilled
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.result?.status) {
            dispatch(userLoggedOut());
          }
        } catch (error) {
          // no need to catch error here
        }
      },
      invalidatesTags: ["AuthUser"],
    }),
  }),
});

export const {
  useUserSignupMutation,
  useEmailVerifyMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserCheckMutation,
  useEmailCheckMutation,
  useResetPasswordMutation,
} = authApi;
