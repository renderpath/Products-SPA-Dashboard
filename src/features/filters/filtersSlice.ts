import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

type FiltersState = {
    search: string;
    category: string;
    sort: SortOption;
};

const initialState: FiltersState = {
    search: "",
    category: "all",
    sort: "default",
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },

        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },

        setSort: (state, action: PayloadAction<SortOption>) => {
            state.sort = action.payload;
        },

        resetFilters: () => initialState,
    },
});

export const { setSearch, setCategory, setSort, resetFilters } =
    filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;