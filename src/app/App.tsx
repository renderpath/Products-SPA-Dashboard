import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppHeader } from "./layout/AppHeader";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage/ProductDetailsPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";

export function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />

                <main className="main">
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
                </main>
            </div>
        </BrowserRouter>
    );
}