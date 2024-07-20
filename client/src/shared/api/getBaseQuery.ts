import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import baseQueryWithReauth from "@app/store/baseQuery";

export const BASE_URL = "http://localhost:3000/api";

export const getBaseQuery = (withAuth = false): BaseQueryFn => {
    return withAuth ? baseQueryWithReauth(fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    })) : fetchBaseQuery({ baseUrl: BASE_URL });
}
