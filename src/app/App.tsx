import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { logout } from "../features/auth/authSlice";
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage/ProductDetailsPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";
import { useAppSelector } from "../shared/hooks/useAppSelector";

export function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    return (
        <BrowserRouter>
            <div className="app">
                <header className="header">
                    <Link className="logo" to="/products">
                        Products Dashboard
                    </Link>

                    <nav className="nav">
                        <Link to="/products">Товары</Link>
                        <Link to="/favorites">Избранное</Link>

                        {user ? (
                            <button
                                className="nav-button"
                                type="button"
                                onClick={() => dispatch(logout())}
                            >
                                Выйти
                            </button>
                        ) : (
                            <Link to="/login">Войти</Link>
                        )}
                    </nav>
                </header>

                {user && (
                    <div className="user-bar">
                        <img src={user.image} alt={user.username} />
                        <span>
              {user.firstName} {user.lastName}
            </span>
                    </div>
                )}

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

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}