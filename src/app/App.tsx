import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppHeader } from "./layout/AppHeader";
import { ProtectedRoute } from "./router/ProtectedRoute";

const LoginPage = lazy(() =>
    import("../pages/LoginPage/LoginPage").then((module) => ({
        default: module.LoginPage,
    })),
);

const ProductsPage = lazy(() =>
    import("../pages/ProductsPage/ProductsPage").then((module) => ({
        default: module.ProductsPage,
    })),
);

const ProductDetailsPage = lazy(() =>
    import("../pages/ProductDetailsPage/ProductDetailsPage").then((module) => ({
        default: module.ProductDetailsPage,
    })),
);

const FavoritesPage = lazy(() =>
    import("../pages/FavoritesPage/FavoritesPage").then((module) => ({
        default: module.FavoritesPage,
    })),
);

const ProfilePage = lazy(() =>
    import("../pages/ProfilePage/ProfilePage").then((module) => ({
        default: module.ProfilePage,
    })),
);

const NotFoundPage = lazy(() =>
    import("../pages/NotFoundPage/NotFoundPage").then((module) => ({
        default: module.NotFoundPage,
    })),
);

export function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />

                <main className="main">
                    <Suspense
                        fallback={
                            <p className="status-message">Загрузка страницы...</p>
                        }
                    >
                        <Routes>
                            <Route path="/" element={<Navigate to="/products" replace />} />
                            <Route path="/login" element={<LoginPage />} />

                            <Route
                                path="/products"
                                element={
                                    <ProtectedRoute>
                                        <ProductsPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/products/:productId"
                                element={
                                    <ProtectedRoute>
                                        <ProductDetailsPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/favorites"
                                element={
                                    <ProtectedRoute>
                                        <FavoritesPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
}