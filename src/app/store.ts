import { configureStore } from "@reduxjs/toolkit";
import { dummyJsonApi } from "../shared/api/dummyJsonApi";

export const store = configureStore({
    reducer: {
        [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dummyJsonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;