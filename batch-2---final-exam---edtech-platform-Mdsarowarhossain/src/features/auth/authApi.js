import { setCookie } from "../../utils/cookieUtils";
import { apiSlice } from "../api/apiSlice";
import { adminLoggedIn, userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          setCookie(
            "userAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            }),
            30
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.user.role === "admin") {
            setCookie(
              "adminAuth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              }),
              30
            );

            dispatch(
              adminLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
            return;
          }
          setCookie(
            "userAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            }),
            30
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
