import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductsResponse } from "../../entities/product/productTypes";
import type { AuthUser, LoginRequest } from "../../features/auth/authTypes";

export const dummyJsonApi = createApi({
    reducerPath: "dummyJsonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        login: builder.mutation<AuthUser, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        getProducts: builder.query<ProductsResponse, void>({
            query: () => "/products?limit=100",
            providesTags: ["Products"],
        }),

        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Products", id }],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
} = dummyJsonApi;