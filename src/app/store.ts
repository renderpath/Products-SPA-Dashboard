import { configureStore } from "@reduxjs/toolkit";
import { favoritesReducer } from "../features/favorites/favoritesSlice";
import { filtersReducer } from "../features/filters/filtersSlice";
import { dummyJsonApi } from "../shared/api/dummyJsonApi";

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        filters: filtersReducer,
        [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dummyJsonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;