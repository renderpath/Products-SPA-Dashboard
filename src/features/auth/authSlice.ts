import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "./authTypes";

const AUTH_STORAGE_KEY = "products_dashboard_auth";

type AuthState = {
    user: AuthUser | null;
};

function getInitialAuthState(): AuthState {
    try {
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

        if (!savedUser) {
            return {
                user: null,
            };
        }

        return {
            user: JSON.parse(savedUser) as AuthUser,
        };
    } catch {
        return {
            user: null,
        };
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialAuthState(),
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem(AUTH_STORAGE_KEY);
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;