import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
    ids: number[];
};

const initialState: FavoritesState = {
    ids: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<number>) => {
            if (!state.ids.includes(action.payload)) {
                state.ids.push(action.payload);
            }
        },

        removeFromFavorites: (state, action: PayloadAction<number>) => {
            state.ids = state.ids.filter((id) => id !== action.payload);
        },

        toggleFavorite: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const isFavorite = state.ids.includes(productId);

            if (isFavorite) {
                state.ids = state.ids.filter((id) => id !== productId);
            } else {
                state.ids.push(productId);
            }
        },
    },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } =
    favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;