import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setCredentials, logout } from "@features/auth/model/authSlice";

const baseQueryWithReauth =
  (
    baseQuery: ReturnType<typeof fetchBaseQuery>
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401 || result.error?.originalStatus === 401) {
      const refreshResult: any = await baseQuery(
        { url: "/auth/refresh", credentials: "include" },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        // localStorage.setItem("token", refreshResult.data.token);
        api.dispatch(setCredentials({ token: refreshResult.data.token }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }

    return result;
  };

export default baseQueryWithReauth;
