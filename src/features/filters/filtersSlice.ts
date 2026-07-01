import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

type FiltersState = {
    search: string;
    category: string;
    sort: SortOption;
    page: number;
    pageSize: number;
};

const initialState: FiltersState = {
    search: "",
    category: "all",
    sort: "default",
    page: 1,
    pageSize: 12,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.page = 1;
        },

        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
            state.page = 1;
        },

        setSort: (state, action: PayloadAction<SortOption>) => {
            state.sort = action.payload;
            state.page = 1;
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        resetFilters: () => initialState,
    },
});

export const { setSearch, setCategory, setSort, setPage, resetFilters } =
    filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;