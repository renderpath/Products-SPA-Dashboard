import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductsResponse } from "../../entities/product/productTypes";

export const dummyJsonApi = createApi({
    reducerPath: "dummyJsonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => "/products?limit=20",
            providesTags: ["Products"],
        }),

        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Products", id }],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = dummyJsonApi;